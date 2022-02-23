import Header from "./components/Header";
import { useEffect } from "react";
import { useState } from "react";
import Login from "./pages/Login";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Sidebar from "./components/sidebar";

export default function App() {
  const [user, setUser] = useState(null);
  const [Remember, setRemember] = useState(false);
  const changeRemember = (e) => {
    setRemember(e);
  };
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (Remember) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  });

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };
  const refreshToken = async () => {
    try {
      const res = await axios.post("/refresh", { token: user.refreshToken });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 10 < currentDate.getTime()) {
        logout();
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const handleSubmit = async (e) => {
    try {
      if (typeof e.username === "string") {
        const res = await axios.post("/login", {
          username: e.username,
          password: e.password,
        });
        setUser(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {user ? (
        <>
          <Header logout={logout} />
          <Sidebar />
          <div className="rounded-lg mt-20 bg-white overflow-hidden shadow">
            <h2 className="sr-only" id="profile-overview-title">
              Profile Overview
            </h2>
            <div className="bg-white p-6 mb-96 pb-96">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex sm:space-x-5">
                  <div className="flex-shrink-0"></div>
                  <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                    <p className="text-sm font-medium text-gray-600">
                      Welcome back,
                    </p>
                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {user.username}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex justify-center sm:mt-0">
                  <a className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    View profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Login handleSubmit={handleSubmit} changeRemember={changeRemember} />
      )}
    </>
  );
}
