import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPass, logOut } from "../../Features/accountSlice";
import { addMenuCategories } from "../../firebaseFunction";
import AccountContext from "../Context/AccountContext";

function SignUpForm() {
  const { setBtnSwitchForm } = useContext(AccountContext);
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const [nameBussiness, setNameBussiness] = useState();
  const isSignUp = useSelector(state => state.account.isSignUp)
  const dispatch = useDispatch()
  useEffect(()=> {
    if (isSignUp){
        alert("create success, please sign in")
        dispatch(logOut())
        setBtnSwitchForm("LOGIN")
    }
  },[dispatch, isSignUp, nameBussiness, setBtnSwitchForm])
  const signUp = (e) => {
    e.preventDefault();
    if (!email || !pwd || !nameBussiness) return alert("Please fill the blank")
    dispatch(createUserWithEmailAndPass({email: email, pwd: pwd, nameBussiness: nameBussiness.toUpperCase()}))
  }
  console.log(isSignUp);
  return (
    <form action="/send-data-here" method="post">
      <div className="mb-6">
        <input
          type="text"
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Email address"
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Password"
          onChange={(e)=>setPwd(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <input
          type="text"
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Bussiness Name"
          onChange={(e) => setNameBussiness(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <a
          href="#!"
          className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
        >
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        onClick={signUp}
      >
        Sign up
      </button>

      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>
      <button
        type="submit"
        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        onClick={() => setBtnSwitchForm("LOGIN")}
      >
        Sign In
      </button>
    </form>
  );
}

export default SignUpForm;
