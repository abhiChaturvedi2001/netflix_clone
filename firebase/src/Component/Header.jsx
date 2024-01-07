import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUsers, addUsers } from "../Utils/UserSlice";
import { onAuthStateChanged } from "firebase/auth";
import { App_logo } from "../Utils/constant";

const Header = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUsers());
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        // it happens when the user have register
        dispatch(
          addUsers({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUsers());
        navigate("/");
      }
    });

    // unsubscibe when component subscribe
    return () => unSubscribe();
  }, []);

  return (
    <>
      <div className=" absolute w-[150px] top-5 left-5 ">
        <img className=" cursor-pointer " src={App_logo} alt="app_logo" />
      </div>
      {/* // rendering the condition */}
      {user && (
        <div className="absolute right-10 flex items-center space-x-5 top-8">
          <img src={user.photoURL} alt="" />
          <h2 className="text-white">{user.displayName}</h2>
          <button
            onClick={handleLogOut}
            className=" right-5 top-8 border px-4 py-2 cursor-pointer"
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
