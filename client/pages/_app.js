import "../styles/globals.css";
import "../styles/Event.css";
import "../styles/Tabs.css";
import "../styles/home.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppContext from "../context/AppContext";
import SimpleReactLightbox from "simple-react-lightbox";
import { useEffect, useReducer, useState } from "react";
import userReducer from "../reducers/userReducer";
import eventsReducer from "../reducers/eventsReducer";
import Loader from "../Components/Loader";
import { loadUser } from "../action/user";
import StriverModal from "../Components/StriverModal";
import { CartProvider } from "../context/CartContext.js";
// import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [user, dispatchUser] = useReducer(userReducer, {});
  const [contEvents, dispatchEvents] = useReducer(eventsReducer, []);
  const [loading, setLoading] = useState(true);

  const [isVisible, setIsVisible] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await loadUser(dispatchUser, dispatchEvents);
        if (userData?.error) {
          
        }
      } catch (e) {

      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const handleStart = (url) => (url !== router.asPath) && setLoading(true);
  //   const handleComplete = (url) => (url === router.asPath) && setLoading(false);

  //   router.events.on('routeChangeStart', handleStart)
  //   router.events.on('routeChangeComplete', handleComplete)
  //   router.events.on('routeChangeError', handleComplete)

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart)
  //     router.events.off('routeChangeComplete', handleComplete)
  //     router.events.off('routeChangeError', handleComplete)
  //   }
  // },[])

  return !loading ? (
    <SimpleReactLightbox>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>

      <AppContext.Provider
        value={{
          user,
          dispatchUser,
          contEvents,
          dispatchEvents,
        }}
      >
        <CartProvider>
          {/* <StriverModal isVisible={isVisible} setIsVisible={setIsVisible} /> */}
          <ToastContainer />
          <Component {...pageProps} />
        </CartProvider>
      </AppContext.Provider>
    </SimpleReactLightbox>
  ) : (
    <Loader />
  );
}

export default MyApp;
