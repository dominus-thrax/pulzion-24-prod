import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import * as styles from "../styles/layout.module.css";
import bat from "../public/bat_animation .gif"

import headerImg from "../public/astronaut.svg";

const Layout = ({ children }) => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  return (
  <>
    {/* {loader && router.pathname !== "/" && <Loader />} */}
    <div className={`min-h-screen flex flex-col styles.gradientClass ${router.pathname === "/" ? "" : ""}`}>
      <Header />
      <div className={`flex-1 ${router.pathname === "/" ? "" : "background"}`}>
        {router.pathname !== "/" && (
           <div
           id="bg"
           className="fixed bottom-0 left-0 right-0 min-w-full min-h-full "
           style={{
             zIndex: -2,
             height: "100vh",
             backgroundColor:'#000',
             width: "100%",
           }}
         >
           {/* Background Image */}
           <img
             id="bg_img"
             style={{
               zIndex: -1,
               position: "absolute", // Use absolute positioning
               top: 0,
               left: 0,
               height: "100%",
               width: "100%",
               objectFit: "cover",
               opacity:'0.5'
             }}
             src="main.png"
             alt="Background Image"
           />
           {/* Overlay Image */}
           <img
             id="bg_img"
             style={{
               zIndex: 0, // You can adjust this value to control the stacking order
               position: "absolute", // Use absolute positioning
               top: 0,
               left: 0,
               height: "100%",
               width: "100%",
               objectFit: "cover",
             }}
             src="bat_animation .gif"
             alt="Overlay Image"
           />
         </div>
        )}
        <div className={router.pathname !==`/` && 'pt-14'}>
        {children}
        </div>
      </div>
      {router.pathname !== "/" && <Footer />}
    </div>
  </>
);
};

export default Layout;