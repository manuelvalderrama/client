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
  //declaracion de variables en el contexto
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [Remember, setRemember] = useState(false);

  const [Progres, setProgres] = useState(0);
  const changeRemember = (e) => {
    setRemember(e);
  };

  useEffect(() => {
    // hook de use effect en primera renderizacion
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    // use effect con progress
    console.log(Progres);
  }, [Progres]);

  useEffect(() => {
    // use effect
    if (Remember) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  });

  const logout = () => {
    //Funcion usada para cerra sesion
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    //inicializacion de axios para uso de JWT
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
    // Consulta para iniciar sesion
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

  const LifemilesRequest = async (e) => {
    //consulta para plantillas de SKU
    try {
      if (typeof e.pais === "string") {
        var y = [];
        var x = e.sku;
        const chunkSize = 100;
        for (let i = 0; i < x.length; i += chunkSize) {
          //separacion de SKU por lotes, logica
          const chunk = x.slice(i, i + chunkSize);
          y.push(chunk);
        }
        let res = [];
        for (let i = 0; i < y.length; i++) {
          //consulta de axios por lotes
          setProgres((i * 100) / y.length);
          await axios
            .post("http://172.19.0.60:5000/api/plantilla", {
              pais: e.pais,
              sku: y[i],
              tipo: e.tipo,
            })
            .then((response) => {
              res.push(response.data); //envio de consulta de respuesta
            });
        }
        setProgres(0);
        return res;
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
    // variables exportadas y usadas por otros componentes
    return {
      logout,
      LifemilesRequest,
      Slide,
      user,
      toogleSlide,
      changeRemember,
      handleSubmit,
      Progres,
    };
  }, [Slide, Progres]); //Las variables proporcionadas por el contexto solo cambian cuando estas variables cambian

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
