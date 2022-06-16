import { Navigate } from "react-router-dom";

const PublicRoute = (props) => {
  const data = localStorage.getItem("user");
  const { children } = props;
  if (!data) {
    //si existe un usuario no se es posible acceder a esta ruta
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PublicRoute;
