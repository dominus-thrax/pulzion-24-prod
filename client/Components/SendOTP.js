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
        <div>
            {/* formik.handleSubmit && props.toggleOTPScreen */}
            <form className={`bg-[#B48754] shadow-md px-8 pt-6 pb-8 mb-0 h-full w-ful`} onSubmit={formik.handleSubmit}>
                <div className="mb-4 flex flex-col gap-2">
                    {/* <label className="block text-primaries-100 text-lg font-bold tracking-wide" htmlFor="email">Your Email</label> */}
                    <input
                        className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
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
                <span className="inline-block text-sm font-body text-black bg-orange-500 rounded-md p-2  hover:bg-orange-800 hover:rounded-md hover:p-2  hover:text-white align-baseline cursor-pointer ">
                    Get OTP
                </span>
            </form>    
        </div>
    )
}

export default SendOTP;