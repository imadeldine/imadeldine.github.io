import React, { useEffect } from "react";
import "./login.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    var userObject = jwt_decode(response.credential);

    if (userObject.email_verified === true) {
      navigate("/home");
      localStorage.setItem("user", JSON.stringify(userObject));
    }

    document.getElementById("signInDiv").hidden = true;
  };

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "404982912044-mjreeh2jlsgsildvr4cub2r0auuvvln4.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    localStorage.setItem("lastsearch", "");
  }, []);

  return (
    <div className="container-login">
      <div className="form">
        <h1 className="form-h1">Sign in Using Google </h1>
        <h4 className="form-h4">
          Please sign in with google to reach our website
        </h4>
        <div id="signInDiv" className="singindiv"></div>
      </div>
    </div>
  );
}

export default Login;
