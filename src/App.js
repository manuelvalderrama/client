import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import MyRoutes from "./components/routes/routes";
import { Contextapp } from "./context/contextapp";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
export default function App() {
  const [user, setUser] = useState(null);
  const [Remember, setRemember] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    console.log("usuario cambiado:", user);
  }, [user]);

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
    <BrowserRouter>
      <Contextapp>
        <ToastContainer />
        <MyRoutes Plantilla={Plantilla} />
      </Contextapp>
    </BrowserRouter>
  );
}
