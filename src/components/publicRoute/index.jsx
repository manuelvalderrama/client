import { Navigate } from "react-router-dom";

const PublicRoute = (props) => {
  const data = localStorage.getItem("user");
  const { children } = props;
  if (!data) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PublicRoute;
