import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUserWithEmailAndPass } from '../../Features/accountSlice';
import { getMenuCategories } from '../../Features/menuSlice';
import AccountContext from '../Context/AccountContext'

function LoginForm() {
    const router = useRouter()
    const {setBtnSwitchForm} = useContext(AccountContext)
    const [isLoading, setLoading] =useState(false)
    const [email, setEmail] = useState();
    const [pwd, setPwd] = useState();
    const dispatch = useDispatch()
    const user = useSelector(state => state.account.user);
    useEffect(() => {
      if(user) {
        let path = '/account/' + user.nameBussiness
        router.push(path)
      }
    }, [dispatch, isLoading, router, user])
    
    const signin = (e) => {
        e.preventDefault();
        dispatch(loginUserWithEmailAndPass({email: email, pwd: pwd}))
    }
  return (
    <div>
    <div className="mb-6">
      <input
        type="text"
        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Bussiness Name"
        onChange={(e)=>setEmail(e.target.value)}
      />
    </div>
    <div className="mb-6">
      <input
        type="password"
        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Password"
        onChange={(e)=>setPwd(e.target.value)}
      />
    </div>

    <div className="flex justify-between items-center mb-6">
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          id="exampleCheck3"
        />
        <label
          className="form-check-label inline-block text-gray-800"
        >
          Remember me
        </label>
      </div>
      <a
        href="#!"
        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
      >
        Forgot password?
      </a>
    </div>
    <button
      type="submit"
      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      onClick={signin}
    >
      Sign in
    </button>

    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
      <p className="text-center font-semibold mx-4 mb-0">OR</p>
    </div>
    <button
      type="submit"
      className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      onClick={()=> setBtnSwitchForm("SIGNUP")}
    >
      Sign Up
    </button>
  </div>
  )
}

export default LoginForm