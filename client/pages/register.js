import React, { useState, useEffect } from "react";
import Head from 'next/head';
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import Layout from "../Components/Layout";
import styles from "../styles/loginsignup.module.css";
import publicRoute from "../routes/publicRoute";

const LoginSignup = () => {
  const [login, setLogin] = useState(true);
  const [ios, setIos] = useState(false);

  const switchForm = (formType) => {
    if (!ios) {
      const formElement = document.querySelector(`.${styles.login_register_form}`);
      if (formType === 'login') {
        formElement.classList.remove(`${styles.rotate}`);
      } else {
        formElement.classList.add(`${styles.rotate}`);
      }
    }

    setLogin(formType === 'login');
  }

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIos(isIOS);
  }, []);

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
      <div className="forms">
        <div className={`${styles.login_signup_page} sm:w-full md:w-3/4 lg:w-2/3 px-4 py-8 flex justify-center items-center flex-col`}>
          <div className={`flex flex-col md:flex-row ${styles.login_register_container}`}>
            <div className={`md:w-1/2 hidden md:flex flex-col items-center justify-center rounded-l-md bg-gradient-to-br from-[#B48754] to-[#EDCE9A] opacity-50`}>
              <h1 className={`mb-5 text-5xl text-center text-white font-body`}>Welcome</h1>
              <div style={{ marginLeft: "34%"}}>
                <img src="pumpkins.png" width={"50%"} />
              </div>
            </div>
            <div className={`${styles.login_register_form} bg-[#B48754] shadow-md px-8 pt-6 pb-8 mb-4 h-full w-full border border-primaries-600 rounded-r-md w-full md:w-1/2 flex flex-col items-center`}>
              {login ? <LoginForm displayRegister={() => switchForm('signup')} /> : <RegisterForm displayLogin={() => switchForm('login')} />}
              <div className={`form-wrapper ${login ? 'is-active' : ''}`}>
                {
                  !login ?
                    <div className={`bg-[#B48754] shadow-md px-8 pt-6 pb-8 mb-4 h-full w-full`}>
                      <h1 className="text-xl text-center text-red-500 font-body">Already Have an Account?</h1>
                      <button
                        type="button"
                        onClick={() => switchForm('login')}
                        className="text-xl font-body text-center text-black bg-orange-500 rounded-md p-2 hover:text-white hover:bg-orange-800 hover:rounded-md hover:p-2"
                      >
                        Login
                        <span className="underline"></span>
                      </button>
                    </div>
                    :
                    <div className={`bg-[#B48754] shadow-md px-8 pt-6 pb-8 mb-4 h-full w-full`}>
                      <h1 className="text-xl text-center text-red-500 font-body">Don't Have an Account?</h1>
                      <button
                        type="button"
                        onClick={() => switchForm('signup')}
                        className="text-xl font-body text-center text-black bg-orange-500 rounded-md p-2 hover:text-white hover:bg-orange-800 hover:rounded-md hover:p-2"
                      >
                        Sign Up
                        <span className="underline"></span>
                      </button>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default publicRoute(LoginSignup);