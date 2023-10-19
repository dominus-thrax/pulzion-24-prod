import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import Layout from "../Components/Layout";
import SendOTP from "../Components/SendOTP";
import ChangePassword from "../Components/ChangePassword";
import styles from "../styles/forgotpassword.module.css"
import { forgetPassword, sendOTP } from "../action/user";
import { useRouter } from "next/router";
import ContentLoader from "../Components/ContentLoader";
// import styles from "../styles/loginsignup.module.css"
// import PrimaryButton from "./Button/PrimaryButton";
// import { userLogin } from "../action/user";
// import AppContext from "../context/AppContext";
// import ContentLoader from "./ContentLoader";

const ForgotPassword = () => {
    const [sentotp, setSentotp] = useState(false);
    const router = useRouter();
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);

    const toggleOTPScreen = async (values) => {
        try {
            setLoading(true)
            console.log(values)
            const data = await sendOTP(values.email);
            console.log(data)
            if (data?.error) {
                toast.error(data.error);
                setLoading(false)
                return;
            }
            setEmail(values.email);
            setLoading(false);
            setSentotp(true)
        } catch (e) {

            toast.error('Something went wrong!')
            setLoading(false);
        }
    }

    const handleForget = async (values) => {
        console.log("Hiiiiii")
        try {
            setLoading(true)
            const data = await forgetPassword({
                ...values,
                email,
            })
            console.log("Data: ");
            console.log(data);
            if (data?.error) {
                toast.error(data.error);
                setLoading(false)
                return;
            }
            toast.success('Password Updated Successfully!');
            router.push('/register');
        } catch (e) {

            toast.error('Something went wrong!')
        }
        setLoading(false);
    }

    return (
        <Layout>
            <div className={`${styles.main_container} flex justify-center`}>
                <div className={`${styles.form_container} border border-primaries-100 rounded w-full md:w-2/3 lg:w-1/3 h-full`}>
                    {sentotp && !loading ? <ChangePassword handleForget={handleForget} /> : !sentotp && !loading ? <SendOTP toggleOTPScreen={toggleOTPScreen} /> : <ContentLoader />}
                </div>
            </div>
        </Layout>

    )
}

export default ForgotPassword;