import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getDatabase, set, ref, push } from "firebase/database";
const FormPage = () => {
  const db = getDatabase(app);
  //   const auth = getAuth(app);

  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    email: "",
    number: "",
    gender: "",
    messages: "",
  });
  var atposition = data.email.indexOf("@");
  var dotposition = data.email.lastIndexOf(".");

  // else if (
  //   atposition < 3 ||
  //   dotposition < atposition + 2 ||
  //   dotposition + 2 >= data.email.length
  // )
  // {
  //   toast.error("Invalid email address");
  // }
  const submitForm = async e => {
    e.preventDefault();
    if (data.userName === "") {
      toast.error("userName is missing");
    } else if (data.email === "") {
      toast.error("Email is missing");
    } else if (data.number === "") {
      toast.error("Phone number is missing");
    } else if (data.number.length !== 10) {
      toast.error("Phone number should be 10 digits");
    } else if (data.messages === "") {
      toast.error("Messages is missing");
    } else if (data.gender === "") {
      toast.error("Select Gender");
    } else {
        try {
            await push(ref(db), {
              userName: data.userName,
              email: data.email,
              number: data.number,
              gender: data.gender,
              messages: data.messages,
            });
            navigate("/Thanks")
            setData({
              userName: "",
              email: "",
              number: "",
              gender: "",
              messages: "",
            });
          } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Error submitting form");
          }
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-300 flex justify-center items-center">
      <div className="h-3/4 w-2/3 border-2 flex justify-center items-center flex-col bg-slate-200">
        <input
          type="text"
          placeholder="userName"
          className="text-center h-9 w-[70%] my-2"
          value={data.userName}
          onChange={e => setData({ ...data, userName: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="text-center h-9 w-[70%] my-2"
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input
          type="number"
          placeholder="Phone Number"
          className="text-center h-9 w-[70%] my-2"
          value={data.number}
          onChange={e => setData({ ...data, number: e.target.value })}
        />

        <select
          className="text-center h-9 w-[70%] my-2"
          defaultValue="Gender"
          onChange={e => setData({ ...data, gender: e.target.value })}>
          <option disabled>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option> {/* Corrected value */}
        </select>

        <input
          type="text"
          placeholder="Messages"
          className="text-center h-14 w-[70%] my-2"
          value={data.messages}
          onChange={e => setData({ ...data, messages: e.target.value })}
        />

        <button
          onClick={submitForm}
          className="bg-green-500 w-[50%] h-10 text-white text-xl font-semibold hover:bg-green-900 mt-10">
          Submit
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

export default FormPage;
