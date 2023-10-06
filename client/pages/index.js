import PrimaryButton from "../Components/Button/PrimaryButton";
import Layout from "../Components/Layout";
import Typewriter from "typewriter-effect";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { IoCalendarOutline } from "react-icons/io5";
import styles from "../styles/homeAnimation.module.css";
import Sound from "react-sound";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { Header } from "../Components/Header";

export default function Home() {
  const { user } = useContext(AppContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  return (
    <Layout>

      <div className="relative">
        <Head>
          <title>Pulzion</title>
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

        <div className="bg-[url('/homepage_background.png')]  relative h-[100dvh]  bg-center bg-top bg-no-repeat bg-cover flex justify-center overflow-hidden">
          <Sound
            url="/halloween_sound.mp3"
            playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
          />
          <div className="absolute opacity-70 inset-0 bottom-0 w-full bg-[url('/bat_animation_crop.gif')] bg-center z-0"></div>
          <img
            src="/spider_web_white.png"
            className="h-80 sm:h-80 absolute -bottom-44 sm:-bottom-40 -left-40 sm:-left-28 opacity-50"
          />
          {/* <img
            src="/spider_web_white.png"
            className="h-80 sm:h-80 absolute -bottom-44 sm:-bottom-40 -right-36 sm:-right-28 opacity-50"
          /> */}
          <img
            src="/witch.svg"
            className={`w-[95px] sm:w-[120px] absolute my-6 sm:my-14 lg:my-4 opacity-90 ${styles.witch}`}
          />
          <div className="flex flex-col gap-4 w-11/12 md:w-5/6 mx-auto justify-center items-center z-10">
            {/* <img src="magicflare.png" alt="magic flare" className="w-40" /> */}
            {/* <p className="text-lg italic font-normal text-center text-primaries-100 md:text-xl">
            presents
          </p> */}
            <img
              src="/homepage_logo_3.png"
              className="w-full sm:max-w-xl xl:max-w-2xl mt-10 lg:mt-20"
            />
            <h2
              className={`text-black text-5xl sm:text-6xl uppercase text-center ${styles.tagline}`}
            >
              The annual techfest of PICT ACM Student Chapter
            </h2>
            <h2
              className={`text-gray-900 text-4xl font-bold text-center font_montserrat`}
            >
              27th,28th & 29th October
            </h2>
            {/* <div className="flex flex-row items-center justify-center gap-4 text-2xl font-bold md:gap-6 text-primaries-100 md:text-5xl">
            <IoCalendarOutline /> <p>3rd, 4th &amp; 5th May</p>
          </div> */}
            <button
              className="bg-[#840025] rounded-full absolute bottom-6 right-6"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <FaPauseCircle className="w-10 h-10 text-[#FF8200]" />
              ) : (
                <FaPlayCircle className="w-10 h-10 text-[#FF8200]" />
              )}
            </button>
            <button
              className="p-5 sm:p-7 rounded-sm text-center bg-contain bg-no-repeat relative z-0"
              onClick={() =>
                user?.id ? router.push("/events") : router.push("/register")
              }
            >
              <img
                src="/homepage_button.svg"
                className="absolute inset-0 w-full h-full -z-10"
              />
              <span className="text-[#bdf5fa] text-lg sm:text-xl font-semibold">
                {user?.id ? "Explore Events" : "Register Now"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
