import React from "react";
import { useNavigate } from "react-router-dom";
const ThanksPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-slate-100 flex justify-center items-center">
      <div className="h-96 flex-col rounded-2xl bg-green-600 w-96 flex shadow-slate-600 justify-evenly items-center">
        <h1 className="text-white font-bold text-2xl">
          Thanks for filling the form.😊
        </h1>
        <button
          className="h-10 w-36 text-l font-bold text-white border-2"
          onClick={() => navigate("/")}>
          Retrun to form
        </button>
      </div>
    </div>
  );
};

export default ThanksPage;
