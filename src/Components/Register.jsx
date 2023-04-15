import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import app from "../FirebaseConfig/firebase.config";
import { Link } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/solid";

const auth = getAuth(app);

const Register = () => {
  const [isShow, setIsShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);
    setError("");
    setSuccess("");
    if (!/.{8,}/.test(password)) {
      return setError("Password at least 8 character");
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      return setError("Password must have minimum one special character");
    }
    if (!/(?=.*?[0-9])/.test(password)) {
      return setError("Password must have minimum one number character");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // console.log(result.user);
        sendVerificationMail(result.user);
        setSuccess("Your registration is successful");
      })
      .catch((err) => setError(err.message.split(":")[1]));
  };
  const sendVerificationMail = (user) => {
    sendEmailVerification(user).then(() => {
      toast.success("A verification email has sent your mail");
      // ...
    });
  };

  return (
    <div className=" p-4 md:w-2/5 mx-auto shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-center">
        <h2 className="text-3xl font-thin">Registration Form</h2>
        <h3 className="text-lg font-semibold">Email:</h3>
        <input
          type="email"
          placeholder="Type your email"
          name="email"
          className="input shadow input-bordered input-lg w-full  p-2 rounded"
        />
        <div className="relative">
          <h3 className="text-lg font-semibold my-2">Password:</h3>
          <input
            type={isShow ? "text" : "password"}
            placeholder="Type your password"
            name="password"
            className="input shadow input-bordered input-lg w-full p-2 rounded"
          />
          <EyeIcon
            onClick={() => setIsShow(!isShow)}
            title={isShow ? "hide password" : "show password"}
            className="h-6 w-6 text-blue-500 absolute bottom-2 right-8"
          />
        </div>

        <input
          type="submit"
          value="Register"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
        <p>
          All ready have an account?{" "}
          <Link className="text-blue-700" to="/login">
            Log in here
          </Link>
        </p>
        <p className="text-green-500">{success}</p>
        <p className="text-yellow-400 ">{error}</p>
      </form>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default Register;
