import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import styles from "../styles/loginsignup.module.css"
import PrimaryButton from "./Button/PrimaryButton";
import { userLogin } from "../action/user";
import AppContext from "../context/AppContext";
import ContentLoader from "./ContentLoader";
import Link from 'next/link';

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
  return (<>
    <form className={`${styles.login_form}  text-gray-50 pt-6 pb-8 mb-4 h-full md:w-8/12`} onSubmit={formik.handleSubmit}>
      <div className="flex flex-col mt-12 gap-2 mb-4 ">
        {/* <label className="block text-lg font-body tracking-wide text-black-500" htmlFor="email">Email Address</label> */}
        <input
          className="px-4 py-2 w-full border-2 mx-auto bg-slate-800 text-white border-cyan-300 rounded-2xl focus:outline-none focus:shadow-[0px_0px_28px_10px_#2b6cb0]"
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

      <div className="flex flex-col mt-8 gap-2 mb-0">
        {/* <label className="block text-lg  text-black-500 font-body " htmlFor="password">Password</label> */}
        <input
          className="px-4 py-2 w-full border-2 mx-auto bg-slate-800 text-white border-cyan-300 rounded-2xl  focus:outline-none focus:shadow-[0px_0px_28px_10px_#2b6cb0]"
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
      <div className="flex items-center mt-8 justify-between font-body text-2xl ">
        <PrimaryButton type='submit ' className="px-4 py-2 w-full mx-auto bg-cyan-400 text-cyan-800 rounded-4xl mt-3  focus:outline-none focus:shadow-[0px_0px_28px_10px_#2b6cb0]">
          Login
        </PrimaryButton>
      </div>
      <Link href="/forgotpassword">
        <span className="inline-block text-sm text-cyan-400  rounded-md p-2 hover:rounded-md hover:p-2  hover:text-white align-baseline cursor-pointer ">
          Forgot Password?
        </span>
      </Link>
      <div className={` px-8 pt-6 pb-8 mb-4 `}>
        <p className="text-md text-center text-amber-300">Don't Have an Account? <button className="text-orange-300" onClick={props.displayRegister}>SignUp</button> </p>
      </div>
    </form>
    {loading && <ContentLoader />}
  </>);
}

export default LoginForm;

