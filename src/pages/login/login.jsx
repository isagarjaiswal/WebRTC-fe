import React, { useState, useEffect } from "react";
import "../register/register.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    try {
      console.log("register............");
      await firebase.singinUserWithEmailAndPass(email, password);
      console.log("Registration successful");
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
        <div className="shape"></div>
        <div className="shape" style={{ display: "none" }}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

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
          Login
        </button>

        <div>
          <button
            className="google-btn form-submit-btn"
            onClick={() => firebase.signinWithGoogle()}
          >
            {" "}
            With Google
          </button>
          <NavLink className={"nav-link"} to="/register">
            Register ?
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
// {/* <div className="social">
//           <div className="go">
//             {/* <i className="fab fa-google"></i> */}
//             Google
//           </div>
//           <div className="fb">
//             <NavLink to="/register">Register ?</NavLink>
//           </div>
//         </div> */}
