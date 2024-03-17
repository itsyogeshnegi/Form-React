import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logIn from "/logIn.jpg";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LogInPage = () => {
  const [idPass, setIdPass] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = () => {
    const { email, password } = idPass;
    const auth = getAuth();
    if (!email.trim()) {
      toast.error("Email is blank");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is blank");
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigate("/Data")
        const user = userCredential.user;
        console.log("User logged in:", user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
        toast.error(errorMessage);
      });
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        background: `url('${logIn}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
      <div className="h-80 w-80 rounded-3xl border-2 bg-transparent flex items-center justify-center flex-col">
        <h1 className="text-white font-bold text-3xl">ADMIN</h1>
        <input
          type="email"
          placeholder="Email"
          className="h-10 w-[70%] rounded-xl text-center my-2"
          value={idPass.email}
          onChange={e => setIdPass({ ...idPass, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="h-10 w-[70%] rounded-xl text-center my-2"
          value={idPass.password}
          onChange={e => setIdPass({ ...idPass, password: e.target.value })}
        />
        <button
          onClick={handleLogin}
          className="h-9 w-[50%] bg-green-600 rounded-2xl text-white text-xl font-semibold mt-2 hover:bg-green-800">
          Log In
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default LogInPage;
