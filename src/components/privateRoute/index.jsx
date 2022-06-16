import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const data = localStorage.getItem("user");
  const { children } = props;
  if (data) {
    //si no existe un usuario no es posible acceder a esta ruta
    return children;
  } else {
    console.log("2");
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
