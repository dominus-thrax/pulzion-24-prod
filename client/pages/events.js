import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getAllEvents } from "../action/registeration";
import ContentLoader from "../Components/ContentLoader";
import Layout from "../Components/Layout";
import SectionHeading from "../Components/SectionHeading";
import Tabs from "../Components/Tabs";
import * as eventDetails from "../data/eventDetails";
import pilot from "../public/pilot.svg";

function event() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let sky, center;

    function dot(i) {
      const size = Math.round(Math.random() + 1);
      const root = document.createElement("span");
      root.style.top = center.y + "px";
      root.style.left = center.x + "px";
      root.classList.add("star", `size-${size}`, `axis-${i}`);
      return root;
    }

    function clear() {
      sky.innerHTML = "";
    }

    function init() {
      sky = document.querySelector("#sky");
      center = {
        x: sky.clientWidth / 2,
        y: sky.clientHeight / 2,
      };
      clear();
      for (let i = 0; i < 360; i++) sky.appendChild(dot(i));
    }

    init();
  }, []);

  useEffect(() => {
    // const fetchEvents = async () => {
    //   try {
    //     // const data = eventDetails.eventD;
    //     const data = await getAllEvents();
    //     if (data?.error) {
    //       
    //       setLoading(false);
    //       return;
    //     }
    //     // if (!data) {
    //     //   setLoading(false);
    //     //   return;
    //     // }
    //     setEvents(data.events);
    //   } catch (e) {
    //     
    //   }
    //   setLoading(false);
    // };
    const fetchEvents = () => {
      const data = eventDetails.eventD;
      setEvents(data)
      setLoading(false);
    }
    fetchEvents();
  }, [setEvents]);

  return (
    <Layout>
      <Head>
        <title>Pulzion | Events</title>
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
      <div className="px-4 py-5 events sm:px-8 md:px-12 lg:px-16 md:py-10">
        {/* <object
          type="image/svg+xml"
          data="https://cdn.svgator.com/images/2021/10/animated-astronaut-illustration.svg"
          alt="Animated astronaut illustration made by SVGator"
          img=""
          width="40%"
        ></object> */}
        <div id="sky"></div>
        <div className="flex justify-center mb-10">
          <SectionHeading>Events</SectionHeading>
        </div>
        {loading ? <ContentLoader /> : <Tabs events={events} />}
      </div>
    </Layout>
  );
}

export default event;
