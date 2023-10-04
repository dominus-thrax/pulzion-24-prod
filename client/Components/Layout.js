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
              className="fixed bottom-0 left-0 right-0 min-w-full min-h-full bg-[url('/all_bg_4.png')] bg-cover bg-bottom bg-no-repeat z-0"
              style={{
                zIndex: -2,
                height: "100vh",
                backgroundColor: '#000',
                width: "100%",
              }}
            >
            </div>
          )}
          <div className={router.pathname !== `/` && 'pt-14'}>
            {children}
          </div>
        </div>
        {router.pathname !== "/" && <Footer />}
      </div>
    </>
  );
};

export default Layout;