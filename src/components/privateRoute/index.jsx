import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const data = localStorage.getItem("user");
  const { children } = props;
  if (data) {
    console.log(children);
    return children;
  } else {
    console.log("2");
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
