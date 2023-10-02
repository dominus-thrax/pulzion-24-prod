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

  useEffect(()=> {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(isIOS) {
      setIos(true)
    } else {
      setIos(false)
    }
  })

  return (
    <>
      <form
        className={`${styles.register_form} bg-[#B48754] shadow-md px-8 pt-6 pb-8 mb-4 h-full w-full`}
        onSubmit={formik.handleSubmit}
      >
        <h1 className={`${styles.hidden_h1} text-primaries-100 md:text-5xl text-xl my-6`}>
          Welcome
        </h1>
        <div className="flex flex-col gap-2 mb-4">
          {/* <label
            className="block text-lg font-body text-black-500"
            htmlFor="firstname"
          >
            First Name
          </label> */}
          <input
            className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
            id="first_name"
            name="first_name"
            type="text"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="First Name"
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <div className="text-white-500">{formik.errors.first_name}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {/* <label
            className="block text-lg font-body text-black-500"
            htmlFor="last_name"
          >
            Last Name
          </label> */}
          <input
            className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
            id="last_name"
            name="last_name"
            value={formik.values.last_name}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Last Name"
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <div className="text-white-500">{formik.errors.last_name}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {/* <label
            className="block text-lg font-body text-black-500"
            htmlFor="mobile_number"
          >
            Mobile Number
          </label> */}
          <PhoneInput
          className={"font-body"}
            country={"us"}
            value={formik.values.mobile_number}
            enableSearch={true}
            onBlur={formik.handleBlur}
            onChange={(phone) =>
              formik.setValues({ ...formik.values, mobile_number: phone })
            }
            containerStyle={{
              display: "block",
            }}
            inputStyle={{
              color: "grey",
              background: "#01030c",
              fontSize: "1rem",
              width: "100%",
            }}
            buttonStyle={{
              background: "#01030c",
            }}
          />
          {formik.touched.mobile_number && formik.errors.mobile_number ? (
            <div className="text-white-500">{formik.errors.mobile_number}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {/* <label
            className="block text-lg font-body text-black-500"
            htmlFor="country"
          >
            Country
          </label> */}
          <CountryDropdown
            className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
            value={formik.values.country}
            onChange={(nation) =>
              formik.setValues({ ...formik.values, country: nation })
            }
          />

          {formik.touched.country && formik.errors.country ? (
            <div className="text-white-500">{formik.errors.country}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {/* <label
            className="block text-lg font-body text-black-500"
            htmlFor="college"
          >
            College
          </label> */}
          <select
            name="college"
            className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
            aria-label="Default select example"
            value={formik.values.college}
            onClick={()=>{setOthers(true)}}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}            
          >
            <option value="">{others? "Select College" : "Others"}</option>
            <option value="PICT">PICT</option>
            <option value="Others">Others</option>
          </select>
          {formik.touched.college && formik.errors.college && others ? (
            <div className="text-white-500">{formik.errors.college}</div>
          ) : null}
        </div>        
        {formik.values.college === "Others" || !others ? (
          <div className="flex flex-col gap-2 mb-4">
            {/* <label
              className="block text-lg font-body text-black-500"
              htmlFor="college_name"
            >
              College Name
            </label> */}
            <input
              className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
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
              <div className="text-white-500">{formik.errors.college}</div>
            ) : null}
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-col gap-2 mb-4">
          {/* <label
            className="block text-lg font-body text-black-500"
            htmlFor="year"
          >
            Year
          </label> */}
          <select
            name="year"
            className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
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
            <div className="text-white-500">{formik.errors.year}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {/* <label
            className="block text-lg font-body text-black-500"
            htmlFor="email"
          >
            Email Address
          </label> */}
          <input
            className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email Address"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-white-500">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {/* <label
            className="block text-lg font-body text-black-500"
            htmlFor="password"
          >
            Password
          </label> */}
          <input
           className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-white-500">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {/* <label
            className="block text-lg font-body text-black-500"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label> */}
          <input
            className="block text-lg font-body text-grey-500 w-full px-3 py-2 leading-tight tracking-wide border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Confirm Password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-white-500">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <PrimaryButton type="submit" className="font-body text-2xl text-black bg-orange-500 rounded-md p-2  hover:bg-orange-800 hover:rounded-md hover:p-2 hover:text-white">Sign Up</PrimaryButton>

        <button
          onClick={props.displayLogin}
          type="button"
          className={`${!ios ? styles.hidden_link : ""} inline-block align-baseline font-body text-sm text-black-500 hover:text-blue-800 my-6`}
        >
          Already have an account? Login
        </button>
      </form>
      {loading && <ContentLoader />}
    </>
  );
};

export default RegisterForm;
