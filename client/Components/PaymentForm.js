import { useState, useEffect } from "react";
import QrCode from "react-qr-code";
import { toast } from "react-hot-toast";
import { paymentForm } from "../action/paymentForm";
import { Router, useRouter } from "next/router";
import { useCartContext } from "../context/CartContext";
import { clearCart } from "../action/cart";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function PaymentForm(props) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      // const res = await axios.get(
      //   "https://pulzion-ems.s3.ap-south-1.amazonaws.com/referal/referal.json"
      // );

      // setData(res.data.refreal);
    })();
  }, []);

  async function register(values) {
    try {
      setLoader(true);

      const res = await paymentForm(
        values.transaction_id,
        values.referal_code,
        props.events,
        props.combos
      );
      console.log("Response:")
      console.log(res);
      if (res.error) {
        setLoader(false);
        toast.error(res.error);
        return;
      }
      console.log("Clear Cart");
      await clearCart();
      props.setEvents([]);
      props.setCombos([]);

      setLoader(false);
      toast.success("Transaction has been sent for verification");

      router.push("/orders");
    } catch (error) {

      setLoader(false);
      console.log(error.data);
      toast.error("Something went wrong");
      // console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: { transaction_id: "", referal_code: "" },
    validationSchema: Yup.object({
      transaction_id: Yup.string()
        .trim()
        .required()
        .min(12)
        .max(12)
        .label("Transaction Id"),
    }),
    onSubmit: register,
  });

  return (
    <div
      style={{
        visibility: props.open ? "visible" : "hidden",
        zIndex: "99",
        pointerEvents: "none",
      }}
      className="fixed top-0 left-0 w-[100%] min-h-screen backdrop-blur"
    >
      <div
        className="fixed w-11/12 overflow-y-auto md:max-h-[500px] flex flex-col max-w-xl bg-slate-800 bg-opacity-90 text-white rounded-3xl  shadow-[1px_3px_26px_2px_#dd6b20]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "all",
          height: "90vh",
        }}
      >
        <div className="flex flex-row items-center w-full px-5 py-6 overflow-hidden shadow-2xl bg-slate-800 bg-opacity-90 md:px-8 event_modal_title rounded-t-3xl">
          <div className="font-bold whitespace-pre sm:text-xl text-md basis-1/2 md:text-2xl">
            Registration Form
          </div>

          <div
            className="hover:cursor-pointer relative left-[40%] sm:left-[45%] basis-1/2"
            onClick={props.close}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between w-full  gap-2 px-2 shadow-lg sm:py-6 sm:flex-row md:px-5 event_modal_title rounded-t-3xl">
          <div className="flex flex-col gap-1 mt-2 bg-white sm:h-auto rounded-xl">
            <QrCode
              className="p-2 pointer-events-none sm:p-4"
              value={
                "upi://pay?pa=pictscholarship@jsb&pn=PICT ACM Student Chapter&am=" +
                props.amount +
                "&tn=Pulzion&cu=INR"
              }
            />
            <img
              src="./BHIM-UPI.png"
              className="sm:-mt-14 relative left-10 sm:p-4 w-[170px] sm:max-w-[230px]"
            />
            <div className="flex flex-row items-center justify-center -mt-8 sm:-mt-12 sm:gap-2">
              <img
                src="G-Pay.png"
                className="sm:max-w-[100px] w-[75px]"
                alt="g-pay"
              />
              <img
                src="Phone-Pe.png"
                className="sm:max-w-[100px] w-[75px]"
                alt="phone-pe"
              />
            </div>
          </div>
          <div className="h-[100%] sm:p-2">
            <form onSubmit={formik.handleSubmit}>
              <label
                className="block mb-2 font-bold text-md text-primaries-100"
                htmlFor="transaction_id"
              >
                UPI Transaction Id{" "}
                <span className="block text-sm font-bold text-primaries-100">
                  (UPI Reference Number) <br /> (PhonePe Users enter UTR number)
                </span>
              </label>
              <input
                className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none bg-primaries-700 text-primaries-100 placeholder:text-primaries-100 focus:outline-none focus:shadow-outline"
                id="transaction_id"
                name="transaction_id"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Transcation Id"
                value={formik.values.transaction_id}
              />
              {formik.touched.transaction_id && formik.errors.transaction_id ? (
                <div className="text-red-500">
                  {formik.errors.transaction_id}
                </div>
              ) : null}

              {/* <label
                className="block mt-6 font-bold text-md text-primaries-100"
                htmlFor="referal_code"
              > */}
              {/* Referral (Optional) */}
              {/* Are You Referred By Someone?
              </label> */}

              {/* <select
                name="referal_code"
                className="w-full px-3 py-2 mt-1 leading-tight border rounded shadow appearance-none bg-primaries-700 text-primaries-100 focus:outline-none focus:shadow-outline"
                aria-label="Default select example"
                value={formik.values.referal_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="NA" className="text-primaries-100">
                  Select referrer
                </option>
                {data.map((item) => {
                  return (
                    <option value={item.code} className="text-primaries-100">
                      {item.code}
                    </option>
                  );
                })}
              </select> */}
              <button
                type="submit"
                className="float-right mt-4 px-4 py-2 mb-2 w-[55%] text-center border-4 border-[#3a5f9d] hover:border-[#172947] text-primaries-100 rounded-xl"
              >
                Register {loader && <i class="fa fa-spinner fa-spin"></i>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
