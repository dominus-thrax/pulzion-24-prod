import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "../styles/loginsignup.module.css";
import PrimaryButton from "./Button/PrimaryButton";
import AppContext from "../context/AppContext";
import { userRegister } from "../action/user";
import { toast } from "react-toastify";
import ContentLoader from "./ContentLoader";
import { CountryDropdown } from "react-country-region-selector";

const years = ["FE", "SE", "TE", "BE"];

const RegisterForm = (props) => {
  const { dispatchUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [others, setOthers] = useState(true);
  const [ios, setIos] = useState(false);

  const handleRegister = async (values) => {
    //console.log("Handle Submit");
    try {
      setLoading(true);
      const data = await userRegister(values, dispatchUser);
      if (data?.error) {
        toast.error(data.error);
      }
    } catch (e) {

      toast.error("Something Went Wrong");
    }
    setLoading(false);
  };

  const handleInputChange = (event) => {
    setOthers(false);
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      mobile_number: "",
      country: "",
      college: "",
      year: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().trim().required("Required"),
      last_name: Yup.string().trim().required("Required"),
      mobile_number: Yup.string().trim().required("Required"),
      country: Yup.string().trim().required("Required"),
      college: Yup.string().trim().required("Required"),
      year: Yup.string()
        .trim()
        .test("len", "Please select an option", (val) => years.includes(val))
        .required("Required"),
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .trim()
        .test(
          "len",
          "Minimum 8 Characters",
          (val) => val?.toString()?.length >= 8
        )
        .required("Required"),
      confirmPassword: Yup.string()
        .trim()
        .required("Required")
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Password do not much!"
          ),
        }),
    }),
    onSubmit: handleRegister,
  });

  useEffect(() => {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      setIos(true)
    } else {
      setIos(false)
    }
  })

  return (
    <>
      <div className="relative mt-6 mx-4">
        <img src="./pumpkin.png" className={`absolute hidden md:block z-40 -top-14 -left-20 w-32 h-32 ${styles.img}`} />
        <img src="./pumpkin.png" className={`absolute sm:top-2 -left-3 z-40 w-16 h-16 ${styles.img}`} />
        <img src="./jar.png" className={`absolute bottom-0 right-0 z-40 h-20 w-35  ${styles.img}`} />

        <form
          className={` text-gray-50 bg-[#1e293b85] backdrop-blur-sm shadow-[0px_0px_20px_7px] shadow-[#ff82157d] p-3 px-8 rounded-lg pb-8 mb-4 `}
          onSubmit={formik.handleSubmit}
          method="POST"
        >
          <h1 className="text-primaries-100 text-center primary_font uppercase text-2xl sm:text-4xl md:text-5xl font-FEASFBRG mb-4 mx-auto tracking-widest">Register</h1>
          <div className="w-full flex flex-col md:flex-row justify-between gap-4 w-100">

            <div className="flex flex-col gap-2 mb-4 md:w-1/2 ">
              {/* <label
            className="block text-lg  text-black-500"
            htmlFor="firstname"
          >
            First Name
          </label> */}
              <input
                className="px-4 py-2 w-full border-2  mx-auto bg-slate-800 text-white border-[#FF7518] rounded-2xl  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]"
                id="first_name"
                name="first_name"
                type="text"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="First Name"
              />
              {formik.touched.first_name && formik.errors.first_name ? (
                <div className="text-red-600 font-semibold">{formik.errors.first_name}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 mb-4 md:w-1/2">
              {/* <label
            className="block text-lg  text-black-500"
            htmlFor="last_name"
          >
            Last Name
          </label> */}
              <input
                className="px-4 py-2 w-full border-2 mx-auto bg-slate-800 text-white border-[#FF7518] rounded-2xl  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]"
                id="last_name"
                name="last_name"
                value={formik.values.last_name}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Last Name"
              />
              {formik.touched.last_name && formik.errors.last_name ? (
                <div className="text-red-600 font-semibold">{formik.errors.last_name}</div>
              ) : null}
            </div>
          </div>

          {/* Row2  */}
          <div className="w-full  flex-col md:flex-row justify-between gap-4 w-100 grid grid-cols-1 md:grid-cols-2">

            <div className="flex flex-col gap-2 ">

              <PhoneInput
                className=""
                country={"in"}
                value={formik.values.mobile_number}
                enableSearch={true}
                placeholder="Mobile Number"
                onBlur={formik.handleBlur}
                onChange={(phone) =>
                  formik.setValues({ ...formik.values, mobile_number: phone })
                }
                containerStyle={{
                  display: "block",
                }}
                inputStyle={{
                  color: "white",
                  background: "#0f172a",
                  fontSize: "1rem",
                  padding: 20,
                  borderRadius: "1rem",
                  borderWidth: "2px",
                  borderColor: "#FF7518",
                  paddingLeft: "3rem",
                  marginLeft: "auto",
                  width: "100%",
                }
                }
                buttonStyle={{
                  background: "#0f172a",
                  color: "#000000",
                  borderRadius: "1rem",
                  borderColor: "#FF7518",
                  borderWidth: "2px",

                }}

              />
              {formik.touched.mobile_number && formik.errors.mobile_number ? (
                <div className="text-red-600 font-semibold">{formik.errors.mobile_number}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 mb-4">

              <CountryDropdown
                className="px-4 py-2 w-full border-2 mx-auto bg-slate-800 text-white border-[#FF7518] rounded-2xl  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]"
                value={formik.values.country}
                onChange={(nation) =>
                  formik.setValues({ ...formik.values, country: nation })
                }
              />

              {formik.touched.country && formik.errors.country ? (
                <div className="text-red-600 font-semibold">{formik.errors.country}</div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 ">

            <div className="flex flex-col w-full gap-2 mb-4">
              {/* <label
            className="block text-lg  text-black-500"
            htmlFor="college"
          >
            College
          </label> */}
              <select
                name="college"
                className="px-4 py-2 w-full  border-2 mx-auto bg-slate-800 text-white border-[#FF7518] rounded-2xl  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]"
                aria-label="Default select example"
                value={formik.values.college}
                onClick={() => { setOthers(true) }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">{others ? "Select College" : "Others"}</option>
                <option value="PICT">PICT</option>
                <option value="Others">Others</option>
              </select>
              {formik.touched.college && formik.errors.college && others ? (
                <div className="text-red-600 font-semibold">{formik.errors.college}</div>
              ) : null}
            </div>
            {formik.values.college === "Others" || !others ? (
              <div className="flex flex-col gap-2 mb-4">
                {/* <label
              className="block text-lg  text-black-500"
              htmlFor="college_name"
            >
              College Name
            </label> */}
                <input
                  className="px-4 py-2 w-full border-2 mx-auto bg-slate-800 text-white border-[#FF7518] rounded-2xl  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]"
                  id="college"
                  name="college"
                  type="text"
                  //value={formik.values.college_name}
                  onClick={handleInputChange}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="College Name"
                />
                {formik.touched.college && formik.errors.college ? (
                  <div className="text-red-600 font-semibold">{formik.errors.college}</div>
                ) : null}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {/* <label
            className="block text-lg  text-black-500"
            htmlFor="year"
          >
            Year
          </label> */}
            <select
              name="year"
              className="px-4 py-2 w-full border-2 mx-auto bg-slate-800 text-white border-[#FF7518] rounded-2xl  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]"
              aria-label="Default select example"
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Year</option>
              <option value="FE">FE(First Year)</option>
              <option value="SE">SE(Second Year)</option>
              <option value="TE">TE(Third Year)</option>
              <option value="BE">BE(Fourth Year)</option>
            </select>
            {formik.touched.year && formik.errors.year ? (
              <div className="text-red-600 font-semibold">{formik.errors.year}</div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {/* <label
            className="block text-lg  text-black-500"
            htmlFor="email"
          >
            Email Address
          </label> */}
            <input
              className="px-4 py-2 w-full border-2 mx-auto bg-slate-800 text-white border-[#FF7518] rounded-2xl  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email Address"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 font-semibold">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {/* <label
            className="block text-lg  text-black-500"
            htmlFor="password"
          >
            Password
          </label> */}
            <input
              className="px-4 py-2 w-full border-2 mx-auto bg-slate-800 text-white border-[#FF7518] rounded-2xl  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 font-semibold">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {/* <label
            className="block text-lg  text-black-500"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label> */}
            <input
              className="px-4 py-2 w-full border-2 mx-auto bg-slate-800 text-white border-[#FF7518] rounded-2xl  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Confirm Password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-600 font-semibold">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <PrimaryButton type="submit" className="px-4 py-2 w-full mx-auto bg-[#FF7518] text-white-800 rounded-4xl mt-3  focus:outline-none focus:shadow-[1px_1px_10px_1px_#dd6b20]">Sign Up</PrimaryButton>

          <button
            onClick={props.displayLogin}
            type="button"
            className={`text-md text-white mt-4 focus:outline-none `}
          >
            Already have an account? <span className="text-orange-400">Login</span>
          </button>
        </form>
        {loading && <ContentLoader />}
      </div>
    </>
  );
};

export default RegisterForm;
