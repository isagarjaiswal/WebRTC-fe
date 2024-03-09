import React, { useEffect, useState } from "react";
import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useFirebase } from "../../context/FirebaseContext";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login............");
      await firebase.signupUserWithEmailAndPassword(email, password);

      console.log("Login successful");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    firebase.isLoggedIn && navigate("/");
  }, [navigate, firebase]);

  return (
    <>
      <div className="background">
        <div className="shape" style={{ display: "none" }}></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Register Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-submit-btn" onClick={handleSubmit}>
          Register
        </button>
        <div>
          <button
            className="google-btn form-submit-btn"
            onClick={() => firebase.signinWithGoogle()}
          >
            {" "}
            With Google
          </button>
          <NavLink className="nav-link" to="/Login">
            Login ?
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
