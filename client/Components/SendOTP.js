import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import "react-phone-input-2/lib/style.css";
import styles from "../styles/loginsignup.module.css";
import { toast } from 'react-toastify';
import * as Yup from "yup";

const SendOTP = (props) => {

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required")
        }),
        onSubmit: (values) => {
            props.toggleOTPScreen(values)
        }
    });


    return (
        <div className="relative ">
            {/* formik.handleSubmit && props.toggleOTPScreen */}
            <form className={`text-gray-50 bg-[#1e293b85] backdrop-blur-sm shadow-[0px_0px_20px_7px] shadow-[#ff82157d] p-10 rounded-lg pb-8 h-full`} onSubmit={formik.handleSubmit}>
                <div className="mb-4 flex flex-col gap-2">
                    {/* <label className="block text-primaries-100 text-lg font-bold tracking-wide" htmlFor="email">Your Email</label> */}
                    <input
                        className="block text-lg  text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
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
                <span className="inline-block text-sm  text-black bg-orange-500 rounded-md p-2  hover:bg-orange-800 hover:rounded-md hover:p-2  hover:text-white align-baseline cursor-pointer ">
                    Get OTP
                </span>
            </form>
        </div>
    )
}

export default SendOTP;