import PrimaryButton from "../Components/Button/PrimaryButton";
import Layout from "../Components/Layout";
import Typewriter from "typewriter-effect";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { IoCalendarOutline } from "react-icons/io5";
import styles from "../styles/homeAnimation.module.css"
export default function Home() {
  const { user } = useContext(AppContext);
  const [exploring, setExploring] = useState(false);
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Pulzion'23</title>
        <meta
          name="description"
          content="Pulzion is the annual flagship event organized by PICT ACM
        Student Chapter (PASC). Pulzion consists of multiple events in
        technical as well as non-technical domains including coding
        competitions, mock placement interviews, business
        management-based events, design and development based contests
        and quizzing events."
        />
      </Head>
      <div
        className={` flex flex-col items-center justify-center pb-5 ${exploring ? "" : "relative"
          }  `}
        style={{
          paddingTop: "8vh",
          zIndex: 20,
        }}
      >
        <div
          className={`flex flex-col items-center justify-center gap-6 max-w-7xl w-11/12 mx-auto`}
        >
          {/* <p className="text-3xl font-bold tracking-wide text-center text-primaries-100 md:text-5xl">
            PICT ACM Student Chapter
          </p> */}
          <img src="magicflare.png" alt="magic flare" className="w-40"/>
          <p className="text-lg italic font-normal text-center text-primaries-100 md:text-xl">
            presents
          </p>
          <img src="logo.png" className="w-full" />
          <p className="items-center justify-center my-5 text-2xl font-bold tracking-wide text-center text-primaries-100 md:text-3xl">
            The annual techfest of PICT ACM Student Chapter
          </p>
          <div className="flex flex-row items-center justify-center gap-4 text-2xl font-bold md:gap-6 text-primaries-100 md:text-5xl">
            <IoCalendarOutline /> <p>3rd, 4th &amp; 5th May</p>
          </div>
          <div className="flex flex-col gap-6 xl:mt-5 sm:flex sm:flex-row">
            <button className={`${styles.animated} some-button`}
              onClick={() =>
                user?.id ? router.push("/events") : router.push("/register")
              }
            >            
              <span className="text-xl italic tracking-normal">{user?.id ? "Register For Events" : "Register Now"}</span>
            </button>
            <button className={`${styles.animated}`} onClick={() => setExploring(() => !exploring)}>
              <span className="text-xl italic tracking-normal">{exploring ? " Go back Main Page" : "Explore"}</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}