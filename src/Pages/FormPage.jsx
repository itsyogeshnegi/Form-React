import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getDatabase, set, ref, push } from "firebase/database";
import background from "/dashboard.jpg";
const FormPage = () => {
  const db = getDatabase(app);
  //   const auth = getAuth(app);

  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    email: "",
    number: "",
    messages: "",
    state: "",
    city: "",
  });
  // var atposition = data.email.indexOf("@");
  // var dotposition = data.email.lastIndexOf(".");
  const submitForm = async e => {
    e.preventDefault();
    if (data.userName === "") {
      toast.error("Name is missing");
    } else if (data.email === "") {
      toast.error("Email is missing");
    } else if (data.number === "") {
      toast.error("Phone number is missing");
    } else if (data.number.length !== 10) {
      toast.error("Phone number should be 10 digits");
    } else if (data.state === "") {
      toast.error("Fill Your State");
    } else if (data.city === "") {
      toast.error("Fill Your City");
    } else if (
      data.email.indexOf("@") < 3 ||
      data.email.lastIndexOf(".") < data.email.indexOf("@") + 2 ||
      data.email.lastIndexOf(".") + 2 >= data.email.length
    ) {
      toast.error("Invalid email address");
    } else if (data.messages === "") {
      toast.error("Messages is missing");
    } else {
      try {
        await push(ref(db), {
          userName: data.userName,
          email: data.email,
          number: data.number,
          state: data.state,
          city: data.city,
          messages: data.messages,
        });
        navigate("/Thanks");
        setData({
          userName: "",
          email: "",
          number: "",
          city: "",
          messages: "",
          state: "",
        });
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Error submitting form");
      }
    }
  };

  return (
    <div
      className="h-screen w-full bg-slate-300 flex justify-center items-center"
      style={{
        background: `url('${background}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
      <div className="">
        <form className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-white appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  peer border-b-2"
              placeholder=" "
              required
              value={data.userName}
              onChange={e => setData({ ...data, userName: e.target.value })}
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-white appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  peer border-b-2"
              placeholder=" "
              required
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
            />
            <label
              for="floating_password"
              className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="repeat_password"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-white appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  peer border-b-2"
              placeholder=" "
              required
              value={data.number}
              onChange={e => setData({ ...data, number: e.target.value })}
            />
            <label
              for="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone Number
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-white appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  peer border-b-2"
                placeholder=" "
                required
                value={data.state}
                onChange={e => setData({ ...data, state: e.target.value })}
              />
              <label
                for="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                State
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-white appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  peer border-b-2"
                placeholder=" "
                required
                value={data.city}
                onChange={e => setData({ ...data, city: e.target.value })}
              />
              <label
                for="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                City
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-white appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  peer border-b-2"
                placeholder=" "
                required
                value={data.messages}
                onChange={e => setData({ ...data, messages: e.target.value })}
              />
              <label
                for="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Leave comment
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <button
              onClick={submitForm}
              type="submit"
              className="text-white bg-[#00C1A2] hover:bg-[#0093A5] focus:ring-4 focus:outline-none focus:ring-[#0093A5] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0093A5] dark:hover:bg-green-700 dark:focus:ring-[#0093A5] border-2">
              Submit
            </button>
            <button
              onClick={() => navigate("/admin")}
              type="submit"
              className="text-white bg-[#00C1A2] hover:bg-[#00C1A2] focus:ring-4 border-2 focus:outline-none focus:ring-[#00C1A2] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#00C1A2] dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Admin Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
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
