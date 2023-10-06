import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import styles from "../styles/loginsignup.module.css"
import gradientStyle from "../styles/About.module.css"
import PrimaryButton from "./Button/PrimaryButton";
import { userLogin } from "../action/user";
import AppContext from "../context/AppContext";
import ContentLoader from "./ContentLoader";
import Link from 'next/link';
import Layout from "./Layout"
import SectionHeading from "./SectionHeading";

const LoginForm = (props) => {

  const { dispatchUser, dispatchEvents } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const data = await userLogin(values, 'user', dispatchUser, dispatchEvents);
      if (data?.error) {
        toast.error(data.error);
      }
    } catch (e) {

      toast.error('Something Went Wrong')
    }
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: handleLogin
  });
  return (
  <div className="relative">
    
    {/* <SectionHeading>Login</SectionHeading> */}
    <img src="./pumpkin.png" className={`absolute z-40 -top-16 -left-16 w-36 h-36 ${styles.img}`}/>
    <img src="./pumpkin.png" className={`absolute top-0 left-0 z-40 w-20 h-20 ${styles.img}`}/>
    <img src="./jar.png" className={`absolute bottom-0 -right-0 h-20 w-35 z-40 ${styles.img}`}/>
    <form className={`${styles.login_form} text-gray-50 bg-[#1e293b85] backdrop-blur-sm shadow-[0px_0px_20px_7px] shadow-[#ff82157d] p-10 rounded-lg pb-8 mb-4 h-full`} onSubmit={formik.handleSubmit}>      
      <h1 className={`text-primaries-100 text-center uppercase text-3xl sm:text-4xl md:text-5xl font-extralight my-6 mx-auto`}>Login</h1>
      <div className="flex flex-col gap-2 mt-8 mb-4 ">
        {/* <label className="block text-lg tracking-wide font-body text-black-500" htmlFor="email">Email Address</label> */}
        <input
          className="px-4 py-2 w-full border-2 bg-slate-800 text-white border-[#ff8415] rounded-2xl focus:outline-none focus:shadow-[0px_0px_28px_10px_#2b6cb0]"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder='Email Address'
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-white-500">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 mt-8 mb-0">
        {/* <label className="block text-lg text-black-500 font-body " htmlFor="password">Password</label> */}
        <input
          className="px-4 py-2 w-full border-2 bg-slate-800 text-white border-[#ff8415] rounded-2xl  focus:outline-none focus:shadow-[0px_0px_28px_10px_#2b6cb0]"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder='Password'
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-white-500">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="flex items-center justify-between mt-8 text-2xl font-body ">
        <PrimaryButton type='submit ' className="px-4 py-2 w-full mx-auto  bg-[#ff8415] text-black rounded-4xl mt-3  focus:outline-none focus:shadow-[0px_0px_28px_10px_#2b6cb0]">
          Login
        </PrimaryButton>
      </div>
      <Link href="/forgotpassword">
        <span className="inline-block p-2 text-sm text-white align-baseline rounded-md cursor-pointer hover:rounded-md hover:p-2 hover:text-white ">
          Forgot Password?
        </span>
      </Link>
      <div className={` px-8 pt-6 pb-8 mb-4 `}>
        <p className="text-center text-md ">Don't Have an Account? <button className="text-[#ff8415]" onClick={props.displayRegister}>SignUp</button> </p>
      </div>
    </form>
    {loading && <ContentLoader />}
  </div>);
}

export default LoginForm;

