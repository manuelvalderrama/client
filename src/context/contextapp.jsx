import React, {
  useContext,
  useMemo,
  createContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const AppContext = createContext();

export function Contextapp({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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
    navigate("/login");
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
        const res = await axios.post("http://localhost:5000/api/login", {
          username: e.username,
          password: e.password,
        });
        setUser(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCombobox = async (e) => {
    try {
      let res = { f: "asw" };
      await axios.get("http://localhost:5000/api/combobox").then((response) => {
        res = response.data;
      });
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const LifemilesRequest = async (e) => {
    try {
      if (typeof e.pais === "string") {
        var y = [];
        var x = e.sku;
        const chunkSize = 500;
        for (let i = 0; i < x.length; i += chunkSize) {
          const chunk = x.slice(i, i + chunkSize);
          y.push(chunk);
        }
        let res = [];
        for (let i = 0; i < y.length; i++) {
          await axios
            .post("http://172.19.0.60:5000/api/plantilla", {
              pais: e.pais,
              sku: y[i],
              tipo: e.tipo,
            })
            .then((response) => {
              res.push(response.data);
            });
        }

        return [].concat(...res);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const [Slide, setSlide] = useState(true);
  const toogleSlide = () => {
    setSlide(!Slide);
  };
  const value = useMemo(() => {
    return {
      logout,
      LifemilesRequest,
      Slide,
      user,
      toogleSlide,
      getCombobox,
      changeRemember,
      handleSubmit,
    };
  }, [Slide]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
