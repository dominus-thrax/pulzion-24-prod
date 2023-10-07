import React, { useState, useEffect } from "react";
import Head from 'next/head';
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import Layout from "../Components/Layout";
import styles from "../styles/loginsignup.module.css";
import publicRoute from "../routes/publicRoute";
import SectionHeading from "../Components/SectionHeading";


const LoginSignup = () => {
  const [login, setLogin] = useState(true);
  const [ios, setIos] = useState(false);

  const switchForm = (formType) => {
    if (!ios) {
      const formElement = document.querySelector(`.${styles.login_register_form}`);
      // if (formType === 'login') {
      //   formElement.classList.remove(`${styles.rotate.rotate}`);
      // } else {
      //   formElement.classList.add(`${styles.rotate.rotate}`);
      // }
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
        <title>Pulzion | Register</title>
        <meta name='description' content="Pulzion is the annual flagship event organized by PICT ACM
        Student Chapter (PASC). Pulzion consists of multiple events in
        technical as well as non-technical domains including coding
        competitions, mock placement interviews, business
        management-based events, design and development based contests
        and quizzing events."/>
      </Head>



      {login ? <LoginForm displayRegister={() => switchForm('signup')} /> : <RegisterForm displayLogin={() => switchForm('login')} />}
      <div className={`form-wrapper ${login ? 'is-active' : ''}`}>

      </div>
    </Layout>
  );
}

export default publicRoute(LoginSignup);
