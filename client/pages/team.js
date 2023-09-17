import React from "react";
import Head from "next/head";
import styles from "../styles/team.module.css";
import Layout from "../Components/Layout";
import Image from "next/image";
import ProfileCard from "../Components/ProfileCard";
import SectionHeading from "../Components/SectionHeading";

const TeamPage = () => {
  const profiles = [
    {
      name: "Aditi Chavan",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/aditi.jpg",
      designation: "Chairperson",
      linkedin: "https://www.linkedin.com/in/aditi-chavan-439b44206",
    },
    {
      name: "Om Shinde",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/Om+Shinde.png",
      designation: "Vice Chairperson",

      linkedin: "https://www.linkedin.com/in/om-shinde-0aabb1207",
    },
    {
      name: "Tejas Padhiyar",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/secretary.jpg",
      designation: "Secretary",

      linkedin: "https://www.linkedin.com/in/tejas-padhiyar",
    },
    {
      name: "Shivani Makde",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/Shivani.jpeg",
      designation: "Treasurer",

      linkedin: "https://www.linkedin.com/in/shivani-makde",
    },
    {
      name: "Amar Dalvi",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/amar.jpg",
      designation: "Public Relations Officer",

      linkedin: "https://www.linkedin.com/in/amar-dalvi-ba5b36208",
    },
    {
      name: "Pratham More",

      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/Pratham+More.jpg",
      designation: "Technical Head",

      linkedin: "https://www.linkedin.com/in/pratham-more-7688571b5/",
    },
    {
      name: "Suyog Kokaje",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/suyog.jpg",
      designation: "Technical Head",

      linkedin: "https://www.linkedin.com/in/suyog-kokaje-bb54aa212/",
    },
    {
      name: "Yash Kalavadiya",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/Yash+Kalavadiya.png",
      designation: "Domain Director (Web & DevOps)",

      linkedin: "https://www.linkedin.com/in/yash-kalavadiya-789141170/",
    },
    {
      name: "Yash Sonawane",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/yash_sonawane.JPG",
      designation: "Domain Director (Competitive Programming)",

      linkedin: "https://www.linkedin.com/in/yash-sonawane-a49870202",
    },
    {
      name: "Mokshad Vaidya",

      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/Mokshad+Vaidya.jpeg",
      designation: "Domain Director (App)",

      linkedin: "https://www.linkedin.com/in/mokshadvaidya",
    },
    {
      name: "Aishwarya Mirashi",

      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/aishwarya.jpg",
      designation: "Domain Director (ML & AI)",

      linkedin: "https://www.linkedin.com/in/aishwarya-mirashi-620534215",
    },

    {
      name: "Dheeraj Maske",

      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/dheeraj.jpeg",
      designation: "Marketing Head",

      linkedin: "https://www.linkedin.com/in/dheeraj-maske-b47343200",
    },
    {
      name: "Akanksha Waghmare",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/Akanksha.jpg",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/akanksha-waghmare-b53394224",
    },
    {
      name: "Prasenjeet Sonawane",
      avatar:
        "https://pulzion-ems.s3.ap-south-1.amazonaws.com/team/jeet.png",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/prasenjeet-sonawane-856b23205/",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Pulzion'23 | Team</title>
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
      <div className="py-5 md:py-10">
        <SectionHeading>Meet Our Team</SectionHeading>
        <div className="grid items-center justify-center grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 gap-y-20">
          <ProfileCard
            className="col-span-full"
            name="Dr. Geetanjali Kale"
            avatar={"/profiles/tg.jpg"}
            designation="Teacher Guardian"
            linkedin="https://www.linkedin.com/in/dr-geetanjali-kale-17148922/"
          />
        </div>
        <div className="grid items-center justify-center grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-20">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              name={profile.name}
              avatar={profile.avatar}
              designation={profile.designation}
              linkedin={profile.linkedin}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;
