import React, { useRef, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FacebookAuthProvider,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../FirebaseConfig/firebase.config";
const auth = getAuth(app);

const facebookProvider = new FacebookAuthProvider();
const Login = () => {
  const [isShow, setIsShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef("");

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);
    setError("");
    setSuccess("");
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // console.log(res.user.emailVerified);
        if (!res.user.emailVerified) {
          return setError("Your email is not verified yet");
        }
        setSuccess("Your log is successful");
      })
      .catch((err) => setError(err.message.split(":")[1]));
  };
  const handleResetPass = () => {
    const userEmail = emailRef.current.value;
    if (userEmail) {
      sendPasswordResetEmail(auth, userEmail)
        .then(() => toast.success("A reset email has sent your mail"))
        .catch((err) => setError(err.message));
    }
    // console.log(userEmail);
  };
  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((res) => {
        console.log(res.user);
        setSuccess("Log in successful ");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className=" p-4 md:w-2/5 mx-auto shadow-lg">
        <form
          onSubmit={handleLogIn}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="text-3xl font-thin">Log in Form</h2>
          <h3 className="text-lg font-semibold">Email:</h3>
          <input
            ref={emailRef}
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
              className="input  shadow input-bordered input-lg w-full p-2 rounded"
            />
            <EyeIcon
              onClick={() => setIsShow(!isShow)}
              title={isShow ? "hide password" : "show password"}
              className="h-6 w-6 text-blue-500 absolute bottom-2 right-8 cursor-pointer"
            />
          </div>
          <p className="my-4">
            Forget password ?{" "}
            <span
              onClick={handleResetPass}
              className="text-blue-700 cursor-pointer"
            >
              Reset
            </span>
          </p>
          <input
            type="submit"
            value="Log in"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-700" to="/register">
              Register in here
            </Link>
          </p>
          <p className="text-green-500">{success}</p>
          <p className="text-yellow-400 ">{error}</p>
        </form>
        <div>
          <p className="text-lg">
            ---------------- Sign in with ----------------
          </p>
          <button className="m-4 text-blue-600">Google</button>
          <button onClick={handleFacebookLogin} className="m-4 text-blue-600">
            Facebook
          </button>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default Login;
