import React, { useState } from "react";
const LogInPage = () => {
  const [idPass, setIdPass] = useState({
    userId: "",
    password: "",
  });
  return (
    <div className="h-screen w-screen bg-[royalblue] flex justify-center items-center">
      <div className="h-80 w-80 rounded-3xl bg-slate-200 flex items-center justify-center flex-col">
        <input
          type="text"
          placeholder="UserId"
          className="h-10 w-[70%] rounded-xl text-center my-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="h-10 w-[70%] rounded-xl text-center my-2"
        />
        <button className="h-9 w-[40%] bg-green-600 rounded-2xl text-white text-xl font-semibold mt-2 hover:bg-green-800">
          Log In
        </button>
      </div>
    </div>
  );
};

export default LogInPage;
