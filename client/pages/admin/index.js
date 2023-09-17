import React, { useContext } from 'react'
import Head from 'next/head';
import { Formik } from 'formik';
import * as Yup from "yup";
import PrimaryButton from '../../Components/Button/PrimaryButton'
import InputField from '../../Components/FormikField/InputField'
import AppContext from '../../context/AppContext';
import { userLogin } from '../../action/user';
import { toast } from 'react-toastify';
import publicRoute from '../../routes/publicRoute';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .label("Username"),
  password: Yup.string()
    .required()
    .test("len", "Minimum Length 6 Characters", (val) => val?.length >= 6)
    .label("Password"),
});

const Home = () => {
  const { dispatchUser, dispatchEvents } = useContext(AppContext);

  const handleLogin = async (values) => {
    try {
      const data = await userLogin(values, 'admin' ,dispatchUser, dispatchEvents);
      if(data?.error) {
        toast.error(data.error);
        
      }
    } catch(e) {
      
      toast.error('Something Went Wrong')
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-primaries-700">
      <Head>
        <title>Pulzion'23 | Admin</title>
      </Head>
      <Formik
        initialValues={{ username: '', password: '', department: undefined }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {
          ({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="w-full md:w-1/3 bg-primaries-800 rounded-lg" onSubmit={handleSubmit}>
              <div className="flex font-bold justify-center mt-6">
                <img className="h-20 w-20"
                  src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" />
              </div>
              <h2 className="text-3xl text-center text-gray-700 mb-4">Admin Login</h2>
              <div className="px-12 pb-10 flex flex-col gap-2">
                <div className="w-full mb-2">
                  <InputField
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </div>
                <div className="w-full mb-2">
                  <InputField
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <PrimaryButton type='submit'>Login</PrimaryButton>
              </div>
            </form>
          )}
      </Formik>
    </div>
  )
}

export default publicRoute(Home);