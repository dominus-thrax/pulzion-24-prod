import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import * as Yup from "yup";

const ChangePassword = ({ handleForget }) => {
    const formik = useFormik({
        initialValues: {
            otp: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            otp: Yup.string().required("Required"),
            password: Yup.string().trim().test(
                "len",
                "Minimum 8 Characters",
                (val) => val?.toString()?.length >= 8
            ).required("Required"),
            confirmPassword: Yup.string().trim()
                .required("Required")
                .when("password", {
                    is: val => (val && val.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Password do not much!"
                    )
                })

        }),
        onSubmit: (values) => {
            handleForget(values);
        }
    });
    return (
        <div className={`flex justify-center`}>
            <form className={`bg-primaries-700 shadow-md px-8 pt-6 pb-8 mb-4 h-full w-full`} onSubmit={formik.handleSubmit}>
                <h1 className={`text-primaries-100 mb-4`}>You would have received an OTP on your mail. Provide that along with the changed password</h1>
                <div className="mb-4 flex flex-col gap-2">
                    {/* <label className="block text-primaries-100 text-lg font-bold" htmlFor="otp">OTP</label> */}
                    <input
                        className="block text-lg  text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
                        id="otp"
                        name="otp"
                        type="password"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='OTP'
                    />
                    {formik.touched.otp && formik.errors.otp ? (
                        <div className="text-white-500">{formik.errors.otp}</div>
                    ) : null}
                </div>

                <div className="mb-4 flex flex-col gap-2">
                    {/* <label className="block text-primaries-100 text-lg font-bold" htmlFor="password">Password</label> */}
                    <input
                        className="block text-lg  text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Password'
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-white-500">{formik.errors.password}</div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    {/* <label className="block text-primaries-100 text-lg font-bold" htmlFor="confirmPassword">Confirm Password</label> */}
                    <input
                        className="block text-lg  text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Confirm Password'
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="text-white-500">{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>

                <button className={`px-8 py-2 text-black bg-orange-500 rounded-md p-2  hover:bg-orange-800 hover:rounded-md hover:p-2 hover:text-white shadow-md hover:scale-105 ease-in-out`}
                    type="submit"
                    style={{
                        borderRadius: '30px',
                        margin: '2px auto'
                    }}
                >
                    Confirm Password Change
                </button>
            </form>

        </div>
    )
}

export default ChangePassword;