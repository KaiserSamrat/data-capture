import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  let history = useHistory();
  const [count, setCount] = useState(5);

  const { token, email, userrole } = useSelector((state) => ({
    ...state.Login,
  }));

  useEffect(() => {
    if (userrole == "ADMIN") {
      history.push("/admindashboard");
    } else if (userrole == "student") {
      history.push("/studentdashboard");
    } else if (userrole == "teacher") {
      history.push("/teacherdashboard");
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
