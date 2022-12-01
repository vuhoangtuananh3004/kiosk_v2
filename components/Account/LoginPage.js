import Image from "next/image";
import React, { useState } from "react";
import AccountContext from "../Context/AccountContext";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginPage() {
  const [btnSwitchForm, setBtnSwitchForm] = useState("LOGIN");
  return (
    <section className="h-screen">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              alt="Phone image"
              height={500}
              width={900}
            />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <div className="flex w-full justify-center mb-20 text-[48px] font-bold">
              WELCOME TO QUIKEAT
            </div>
            <AccountContext.Provider value={{setBtnSwitchForm}}>
              {(btnSwitchForm === "LOGIN") ? <LoginForm /> : <SignUpForm/>}
            </AccountContext.Provider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
