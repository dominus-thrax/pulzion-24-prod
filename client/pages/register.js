import React from "react";
import Head from 'next/head';
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import Layout from "../Components/Layout";
import { useEffect, useState } from "react";
import styles from "../styles/loginsignup.module.css"
import publicRoute from "../routes/publicRoute";
import hallo from '../public/hallo.jpg';

const LoginSignup = () => {
  const [login, setLogin] = useState(true);
  const [ios, setIos] = useState(false);

  const displayLogin = (e) => {
    !ios ? document.querySelector(`.${styles.login_register_form}`).classList.remove(`${styles.rotate}`) : null

    setLogin(true);
  }

  const displayRegister = (e) => {
    !ios && document.querySelector(`.${styles.login_register_form}`).classList.add(`${styles.rotate}`);

    setLogin(false);
  }

  useEffect(()=> {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(isIOS) {
      setIos(true)
    } else {
      setIos(false)
    }
  })

  return (
    <Layout>
      <Head>
        <title>Pulzion'23 | Register</title>
        <meta name='description' content="Pulzion is the annual flagship event organized by PICT ACM
				Student Chapter (PASC). Pulzion consists of multiple events in
				technical as well as non-technical domains including coding
				competitions, mock placement interviews, business
				management-based events, design and development based contests
				and quizzing events."/>
      </Head>
      <div className={`${styles.login_signup_page} sm:px-8 md:px-12 lg:px-16 flex justify-center flex-col`}>
          <div className={`flex ${styles.login_register_container}`}>
              
              <div className={`hidden md:flex flex-col items-center justify-center rounded-l-md w-full lg:w-1/2 bg-gradient-to-br from-[#172947c5] to-black opacity-95`}>
                  <h1 className={`mb-5 text-5xl  text-center text-primaries-100 font-body `}>Welcome</h1>
                  <div className={`w-300 h-300`}>
                    <img src={hallo} alt="" className="" />
                  </div>
                  {
                    !login ? 
                    <div className="flex flex-col items-center gap-2">
                      <h1 className="text-xl text-center text-red-500 font-body">Already Have an Account?</h1>
                      <button 
                        onClick={displayLogin} 
                        className="text-xl font-body text-center   text-white hover:bg-blue-500 hover:rounded-md hover:p-2" 
                        >
                          Login
                      </button>
                    </div>
                    : 
                    <div className="flex flex-col items-center gap-2 p-4 rounded-lg shadow-md">
                      <h1 className="text-xl text-center text-red-500 font-body">Don't Have an Account?</h1>
                      <button
                        onClick={displayRegister}
                        className="text-xl  font-body text-white hover:bg-blue-500 hover:rounded-md hover:p-2"
                      >
                        Sign Up
                      </button>
                    </div>
                    
                  }
              </div>
              <div className={`${styles.login_register_form} border border-primaries-600 rounded-r-md w-full lg:w-1/2 flex`}>
                  {login ? <LoginForm displayRegister={displayRegister}/> : <RegisterForm displayLogin={displayLogin}/>}
              </div>
          </div>
      </div>
    </Layout>
  );
}

export default publicRoute(LoginSignup)