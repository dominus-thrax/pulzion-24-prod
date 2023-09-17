import React, { useContext, useState } from "react";
import { useFormik } from "formik";
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
            <form className={`bg-primaries-700 shadow-md px-8 pt-6 pb-8 mb-4 h-full w-full`} onSubmit={formik.handleSubmit}>
                <div className="mb-4 flex flex-col gap-2">
                    <label className="block text-primaries-100 text-lg font-bold tracking-wide" htmlFor="email">Your Email</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-primaries-700 text-primaries-100 leading-tight focus:outline-none focus:shadow-outline tracking-wide"
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder='Email Address'
                    />
                    {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                </div>
                <button className={`px-8 py-2 bg-primaries-500 text-white shadow-md hover:scale-105 ease-in-out`} 
                    type="submit"
                    style={{
                        borderRadius: '30px',
                        margin: 'auto',
                        textAlign: 'center'
                    }}
                >
                    Get OTP
                </button>
            </form>    
        </div>
    )
}

export default SendOTP;