import PrimaryButton from "../Components/Button/PrimaryButton";
import Layout from "../Components/Layout";
import Typewriter from "typewriter-effect";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { IoCalendarOutline } from "react-icons/io5";
import styles from "../styles/homeAnimation.module.css";
export default function Home() {
  const { user } = useContext(AppContext);
  const [exploring, setExploring] = useState(false);
  const router = useRouter();

  return (
    <div className="relative">
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
      <div className="bg-[url('/Homepage_Background.png')] relative h-[100dvh] bg-no-repeat bg-cover">
        <div class="absolute inset-0 bottom-0 w-full bg-[url('/bat_animation_crop.gif')] bg-cover bg-center bg-opacity-50"></div>
      </div>
    </div>
  );
}
