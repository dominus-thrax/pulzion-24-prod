import Image from "next/image";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import Layout from "../Components/Layout";
import AcmLogo from "../public/images/Acm-logo.webp";
import PascLogo from "../public/images/Pasc-logo.webp";
import AcmWLogo from "../public/images/Acm-w-logo.webp";
import styles from "../styles/About.module.css";
import CountUp from "react-countup";
import { forwardRef, useState, useImperativeHandle, useRef } from "react";
import SectionHeading from "../Components/SectionHeading";
import Head from "next/head";
import { motion } from "framer-motion";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import * as React from "react";
import config from "react-reveal/globals";
import { useEffect } from "react";

config({ ssrFadeout: true });

const LINKS = [
  {
    Component: FaLinkedin,
    link: "https://www.linkedin.com/company/pict-acm-student-chapter/",
  },
  {
    Component: FaInstagram,
    link: "https://www.instagram.com/acm.pict/",
  },
  {
    Component: FaFacebook,
    link: "https://www.facebook.com/acmpict/",
  },
  {
    Component: FaTwitter,
    link: "https://twitter.com/_pict_acm_",
  },
];

const ABOUT_US_CARDS = [
  {
    title: "PASC",
    description: [
      "PICT ACM Student's Chapter (PASC) is the most active ACM chapter in India.",
      "#UnitedWeStand",
      "At PASC, we all work together, as a team. We take utmost efforts for the success of each and every member of PASC. We help them to achieve not only technical superiority but also bring the best out of them in Non-technical fields as well so that they become the pioneers of today's world. Since, we at PASC bring our Motto into reality, last year we were honored as the BEST ACM STUDENT CHAPTER IN INDIA.",
    ],
    image: PascLogo,
  },
  {
    title: "ACM-W",
    description: [
      "With the objective to support and celebrate the full engagement of women in all aspects of computing field, we conducted an event ACM Pune ‘Celebration of Women in Computing’ (APCWIC-2018) in association with ACM-W India and ACM Pune Professional Chapter. This was the first edition and it was held at PICT, Pune. We organized this event to provide a platform to women professionals and girl students for interaction with eminent individuals from the industry as well as academia, where in they learned about the various challenges and how one can overcome them",
    ],
    image: AcmWLogo,
  },
  {
    title: "ACM",
    description: [
      "The Association for Computing Machinery (ACM) is the world’s largest educational and scientific society uniting professionals, educators and researchers in the field of computer science to inspire dialogue, share resources and address the challenges in the domain. The purpose of this organization is to advance the scientific development, construction and application of the new machinery for computing, reasoning, and handling of information. The mission is to offer the students an opportunity to learn, innovate and grow into intellectuals, visionaries and technocrats, who contribute to promoting the advancements in science and technology. The ACM India Council is an effort of ACM aimed at improving the level of ACM activities across the country. The ACM India Council comprises a cross-section of the Computer Science and Information Technology communities committed to increasing the visibility and relevance of ACM in India.",
    ],
    image: AcmLogo,
  },
];

const EventNumber = ({ name, count }) => {
  return (
    <div className={styles.container + " flex flex-col rounded-full"}>
      <div
        className={
          styles.GradientBorder +
          " flex flex-col items-center justify-center bg-primaries-800"
        }
      >
        <div className="flex flex-col">
          <p className="font-mono text-3xl md:text-4xl lg:text-5xl">
            <CountUp end={count} separator="" />
          </p>
          <p className="text-lg capitalize">{name}</p>
        </div>
      </div>
    </div>
  );
};

const EventNumbers = () => {
  return (
    <Fade left cascade delay={600}>
      <div className="flex flex-col mb-10 space-y-5 md:mb-0 ">
        <div className="flex flex-row items-center justify-center">
          <EventNumber name={"Events"} count={16} />
        </div>
        <div className="flex flex-row items-end justify-center space-x-10">
          <EventNumber name={"Volunteers"} count={300} />
          <EventNumber name={"Footfall"} count={8000} />
        </div>
      </div>
    </Fade>
  );
};

const PulzionInfo = () => {
  return (
    <Fade right cascade>
      <div className="flex flex-col">
        <p
          className="mt-5 text-lg text-center text-white md:text-left md:mt-0 md:text-2xl"
          style={{
            wordSpacing: "0.15em",
          }}
        >
          Pulzion is the annual flagship event organized by PICT ACM Student
          Chapter (PASC). Pulzion consists of multiple events in technical as
          well as non-technical domains including coding competitions, mock
          placement interviews, business management-based events, design and
          development based contests and quizzing events. It is one of the most
          anticipated events taking place at PICT. This year, Pulzion is going
          global to encourage students of varied backgrounds to participate and
          compete. With sincerity, dedication and high aspirations, our chapter
          hopes to add value to our college and the community.
        </p>
      </div>
    </Fade>
  );
};

const AboutModal = forwardRef(({ title, description, image }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  useImperativeHandle(
    ref,
    () => {
      return {
        toggle: () => {
          setIsVisible(!isVisible);
        },
      };
    },
    []
  );
  return (
    <div
      style={{
        zIndex: "9999",
        pointerEvents: "none",
        display: isVisible ? "block" : "none",
      }}
      // onClick={() => setIsVisible(false)}
      className="fixed top-0 left-0 w-screen min-h-screen backdrop-blur"
    >
      <div
        className="bg-primaries-800 text-white fixed overflow-y-auto rounded-3xl p-10 w-[90%] md:w-[40%] overflow-y-auto about-mode"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "all",
          maxHeight: "90vh",
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="font-mono text-5xl">{title}</p>
          <div
            style={{
              width: "100px",
              height: "100px",
            }}
            className="p-2 rounded-md "
          >
            <Image src={image} width={100} height={100} objectFit="contain" />
          </div>
        </div>
        <p className="my-5 font-semibold text-center">
          {description.map((txt) => (
            <p>{txt}</p>
          ))}
        </p>
        <button
          className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            setIsVisible(false);
          }}
        >Close</button>
      </div>
    </div>
  );
});

const AboutCard = ({ title, description, image }) => {
  const modalRef = useRef();

  return (
    <div className="flex flex-col items-center justify-center max-w-lg">
      <div className="w-full p-6 rounded-md shadow-2xl bg-primaries-800">
        <Zoom>
          <div>
            <div className="flex flex-col-reverse items-center md:items-stretch md:flex-row md:justify-between">
              <div className="flex flex-col items-center pt-3 space-y-3 text-center md:pr-6 md:text-left md:items-start md:pt-0">
                <p className="text-xl font-semibold text-white">{title}</p>
                <p className="text-white line-clamp-6">
                  {description.map((txt) => (
                    <p>{txt}</p>
                  ))}
                </p>

                <button
                  className="block px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 md:hidden"
                  onClick={() => modalRef?.current?.toggle()}
                >
                  Know More
                </button>
              </div>
              <div
                style={{
                  width: "100px",
                }}
                className="flex flex-col justify-between"
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="p-2 rounded-md "
                >
                  <Image
                    src={image}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                </div>

                <button
                  className="hidden px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 md:block"
                  onClick={() => modalRef?.current?.toggle()}
                >
                  Know More
                </button>
              </div>
            </div>
          </div>
        </Zoom>
      </div>
      <AboutModal ref={modalRef} {...{ title, image, description }} />
    </div>
  );
};

const Card = ({ title, description, image }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={styles.cardImage}>
        <Image src={image} alt={title} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <ul className={styles.cardDescription}>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const SocialMedia = () => {
  const Icon = ({ Component, link }) => {
    return (
      <a
        href={link}
        target="_blank"
        className="p-4 text-3xl border-2 rounded-full text-primaries-400 border-primaries-500 hover:bg-primaries-500 hover:text-white"
      >
        <Component />
      </a>
    );
  };
  return (
    <div>
      <div className="flex flex-row items-center justify-center space-x-5">
        {LINKS.map((data) => (
          <Icon {...data} />
        ))}
      </div>
    </div>
  );
};

const ContactUs = () => {
  return (
    <div>
      <div className="mb-5 md:mb-10">
        <SectionHeading>Contact us</SectionHeading>
      </div>
      <div className="grid gap-2 md:grid-cols-3 ">
        <div className="flex flex-col text-center">
          <p className="flex flex-row items-center justify-center text-3xl text-white">
            <p>
              <IoLocationSharp />
            </p>
          </p>
          <h1 className="my-3 text-3xl text-white">Address</h1>
          <h3 className="mb-3 text-lg text-white">
            Pune Institute of Computer Technology, Behind Bharati Vidyapeeth
            University, Dhankawadi, Pune, Maharashtra-411043
          </h3>
        </div>
        <div className="flex flex-col text-center">
          <p className="flex flex-row items-center justify-center text-3xl text-white">
            <IoMail />
          </p>
          <p className="my-3 text-lg text-white">
            <a
              className="hover:opacity-50"
              href="mailto:acm.pict@gmail.com"
              target="_blank"
            >
              acm.pict@gmail.com
            </a>
          </p>
          <p className="flex flex-row items-center justify-center mb-3 text-3xl text-white">
            <IoCall />
          </p>
          <p className="text-lg text-white">
            Tejas Padhiyar -{" "}
            <a
              className="flex-auto hover:opacity-50"
              href="tel:9765608601"
              target="_blank"
            >
              (+91) 9765608601
            </a>
          </p>
          <p className="text-lg text-white">
            Aditi Chavan -
            <a
              className="flex-auto hover:opacity-50"
              href="tel:9172682087"
              target="_blank"
            >
              {" "}
              (+91) 9172682087
            </a>
          </p>
        </div>
        <div className="flex-col justify-center">
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                width="100%"
                style={{
                  minHeight: "300px",
                }}
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=pune%20institute%20of%20computer%20technology&t=&z=17&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
              <br />
            </div>
          </div>
        </div>
      </div>
      <SocialMedia />
    </div>
  );
};

const AboutCards = () => {
  return (
    <>
      <div className="flex flex-col justify-center space-y-10 lg:flex-row lg:space-y-0 lg:space-x-10 ">
        <AboutCard {...{ ...ABOUT_US_CARDS[0] }} />
        <AboutCard {...{ ...ABOUT_US_CARDS[1] }} />
      </div>
      <div className="flex flex-col justify-center space-y-10 lg:flex-row lg:space-y-0 lg:space-x-10">
        <AboutCard {...{ ...ABOUT_US_CARDS[2] }} />
      </div>
    </>
  );
};

export default function About() {
  return (
    <Layout>
      <Head>
        <title>Pulzion'23 | About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
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
      <div id="about" className="flex flex-col px-4 py-5 mx-auto space-y-12 sm:px-8 md:px-12 lg:px-16 md:py-10">
        <div className="flex flex-col items-center mb-5 md:mb-10">
          <SectionHeading>About Pulzion</SectionHeading>
        </div>
        <div className="grid grid-flow-row md:grid-cols-2">
          <EventNumbers />
          <PulzionInfo />
        </div>
        <div className="flex flex-col items-center mt-40 mb-10">
          <SectionHeading>About Us</SectionHeading>
        </div>
        <AboutCards />
        <ContactUs />
      </div>
    </Layout>
  );
}
