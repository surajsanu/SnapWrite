import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    //Easier Version:-
    //  if(authStatus === true){
    //     navigate("/")
    //  } else if(authStatus === false){
    //     navigate("/login")
    //  }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader?<h1>Loading...</h1> :<div>{children}</div>;
}

export default Protected;
