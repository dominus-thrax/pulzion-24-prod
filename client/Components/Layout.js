import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import * as styles from "../styles/layout.module.css";

import headerImg from "../public/astronaut.svg";

const Layout = ({ children }) => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  return (
    <>
      {loader && router.pathname !== "/" && <Loader />}
      <div
        className={`min-h-screen flex flex-col styles.gradientClass   ${
          router.pathname === "/" ? "" : ""
        }`}
      >
        <Header />
        <div
          className={`flex-1  ${router.pathname === "/" ? "" : "background"}`}
        >
          {children}
        </div>
        {router.pathname !== "/" && <Footer />}
      </div>
    </>
  );
};

export default Layout;
