import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { addUsers } from "../Utils/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [toggle, settoggle] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  // for email
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleToggle = () => {
    settoggle(!toggle);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    seterrorMessage(message);
    // if message have null value so this code is return from here because something went wrong in this validation;
    if (message) return;

    // if not then it goes for sign in / sign up
    if (toggle) {
      //sign up logic
      // create a user into the firebase sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://lh3.googleusercontent.com/ogw/ANLem4Yk5kbjAa2biKXf4tllKpiuc80wZaX-mwASu4Mqmg=s32-c-mo",
          })
            .then(() => {
              // now update the profile and getting current user data beacuse user haven't not updated value that;s why we have to do auth.currentUser
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUsers({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              seterrorMessage(error.message);
            });
        })
        .catch((error) => {
          seterrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          seterrorMessage(error.code + "-" + error.message);
        });
    }
  };

  return (
    <>
      <div className="login-container">
        <Header />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="form-container px-10 py-10 w-[30rem] min-h-[75vh] rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <h1 className="text-white text-4xl font-bold">
            {toggle ? "Sign up" : "Sign in"}
          </h1>
          <div className="mt-10">
            <input
              ref={email}
              className="block bg-[#333333] focus-within:text-white  w-full py-4 px-3 rounded-md outline-none "
              type="text"
              placeholder="Email or phone Number"
            />
            {toggle && (
              <input
                ref={name}
                className="block bg-[#333333] focus-within:text-white  mt-4 w-full py-4 px-3 rounded-md outline-none "
                type="text"
                placeholder="your name"
              />
            )}
            <input
              ref={password}
              className="w-full bg-[#333333] placeholder:text-white  block mt-4 py-4 px-3 rounded-md outline-none"
              type="password"
              placeholder="Password"
            />
            <p className="text-red-600 font-bold mt-2 text-lg ">
              {errorMessage}
            </p>
            <button
              onClick={handleButtonClick}
              className="bg-red-600 mt-8 w-full py-4 rounded-md text-white font-semibold cursor-pointer"
            >
              {toggle ? "Register" : "Sign in"}
            </button>
            <div className="mt-5">
              <p className="text-white">
                {toggle ? "Already a member ? " : "New to Netflix ? "}
                <span
                  onClick={handleToggle}
                  className="hover:underline cursor-pointer"
                >
                  {toggle ? "Sign up now." : "Sign in now."}
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
