import React, { useState, useContext, useEffect } from "react";
import { TextField, PrimaryButton, Link, Stack } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext); // Change here
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);

    handleGoogleLogin(userObject.email, "somedummy98/A");
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "390806400171-nhgvb4rgdke5d8gplln3pmrfr3mbph9t.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  });

  const handleGoogleLogin = async (username, password) => {
    const response = await fetch(
      "https://localhost:4000/api/Users/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      const decodedToken = jwt_decode(data.token);

      setAuthToken(data.token); // Change here

      const { Role } = decodedToken;

      if (Role == 2) {
        navigate("/admin-dashboard");
      } else if (Role == 1) {
        navigate("/seller-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } else if (response.status === 400) {
      setError("Incorrect username or password.");
    } else {
      console.log(data.statusCode);
    }
  };
  const handleLogin = async () => {
    const response = await fetch(
      "https://localhost:4000/api/Users/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      const decodedToken = jwt_decode(data.token);

      setAuthToken(data.token); // Change here

      const { Role } = decodedToken;

      if (Role == 2) {
        navigate("/admin-dashboard");
      } else if (Role == 1) {
        navigate("/seller-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } else if (response.status === 400) {
      setError("Incorrect username or password.");
    } else {
      console.log(data.statusCode);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handlePasswordReset = () => {
    navigate("/pass-reset");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Prijava</h2>
        <TextField
          className="form-field"
          label="Korisničko ime"
          value={username}
          onChange={(event, newValue) => setUsername(newValue)}
          required
        />
        <TextField
          className="form-field"
          label="Lozinka"
          type="password"
          value={password}
          onChange={(event, newValue) => setPassword(newValue)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <div className="submit-button">
          <PrimaryButton
            text="Prijavi se"
            onClick={handleLogin}
            styles={{ width: "100%" }}
          />
        </div>
        <div id="signInDiv"></div>
        <Stack horizontalAlign="center">
          <Link onClick={handleRegister}>
            Niste registrovani? Registrujte se
          </Link>
        </Stack>
      </div>
    </div>
  );
}

export default Login;
