import Header from "./components/Header";
import { useEffect } from "react";
import { useState } from "react";
import Login from "./pages/Login";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Sidebar from "./components/Sidebar";
import MyRoutes from "./components/routes/routes";
import { Contextapp } from "./context/contextapp";
import { ToastContainer } from "react-toastify";
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
  /*
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
  */
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
  const Plantilla = async (e) => {
    try {
      const res = await axios.get("/api/products", {
        pais: e.pais,
        sku: e.sku,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Contextapp>
      <>
        <ToastContainer />
        {user ? (
          <>
            <div className=" max-h-screen">
              <Header logout={logout} />
              <div className="relative flex min-h-screen">
                <Sidebar />
                <div
                  style={{ maxWidth: "90%", maxHeight: "100%" }}
                  className="bg-white pt-20 "
                >
                  <MyRoutes Plantilla={Plantilla} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <Login handleSubmit={handleSubmit} changeRemember={changeRemember} />
        )}
      </>
    </Contextapp>
  );
}
