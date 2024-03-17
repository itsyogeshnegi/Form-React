import React from "react";
import { useNavigate } from "react-router-dom";
import Thanks from "/thank.jpg";
const ThanksPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-screen bg-slate-100 flex justify-center items-start"
      style={{
        background: `url('${Thanks}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
      <button
        className="h-10 w-36 text-l font-bold text-white bg-black rounded-full border-2"
        onClick={() => navigate("/")}>
        Retrun to form
      </button>
    </div>
  );
};

export default ThanksPage;
