import React from "react";
import { useFirebase } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const { logOut } = useFirebase();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await logOut();
      navigate("/login");
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default SignOutButton;
