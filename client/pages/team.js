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
      name: "Aditya More",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAditya%20More.jpg?alt=media&token=7fa29977-7d38-4695-9c8c-29bdf9550f7f&_gl=1*137dygy*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTIwNDQuNjAuMC4w",
      designation: "Treasurer",

      linkedin: "https://www.linkedin.com/in/aditya-more-9a095422a/",
    },
    
    {
      name: "Samarth Mali",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FSamarthMali.jpg?alt=media&token=26435364-493c-4f88-9778-0c54e42c525c&_gl=1*1ie5ekl*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTE5NTAuNC4wLjA",
      designation: "Vice Chairperson",

      linkedin: "https://www.linkedin.com/in/samarth-mali-19ab15225/",
    },
    {
      name: "Pritika Rohera",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FPranita_photo.jpg?alt=media&token=07e27603-86d5-4302-9528-e7a76c5ac757&_gl=1*11wjkwi*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTE5OTIuNTIuMC4w",
      designation: "Secretary",

      linkedin: "https://www.linkedin.com/in/pritikarohera/",
    },
    {
      name: "Parth Asawa",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FParth%20Asawa.jpg?alt=media&token=e6d4da22-904e-4f02-be06-b6393e7a4688&_gl=1*11kw7bh*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTE4OTYuNTguMC4w",
      designation: "Chairperson",
      linkedin: "https://www.linkedin.com/in/parthasawa100/",
    },
    {
      name: "Pranav Jaju",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FIMG-20231017-WA0008.jpg?alt=media&token=bb876991-ec9a-4011-89a1-79f8333409e2&_gl=1*1p64xtw*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTIxMDIuMi4wLjA",
      designation: "Public Relations Officer",

      linkedin: "https://www.linkedin.com/in/pranav-jaju-7a7635229/",
    },
    {
      name: "Ayush Bulbule",

      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAyush%20Bulbule.jpg?alt=media&token=b7566aa2-928b-42bc-9f05-a15d8c85f47d&_gl=1*hr2j01*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTIxNzAuNjAuMC4w",
      designation: "Technical Head",

      linkedin: "https://www.linkedin.com/in/ayushbulbule/",
    },
    {
      name: "Mustafa Trunkwala",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FMustafa.jpg?alt=media&token=2a382032-9a41-4daf-8d14-9a04d4b69d67&_gl=1*1yetreb*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTIyMjMuNy4wLjA",
      designation: "Technical Head",

      linkedin: "https://www.linkedin.com/in/mustafa-trunkwala-49249a22a/",
    },
    {
      name: "Charul Nampalliwar",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FCharul%20Nampalliwar.jpeg?alt=media&token=2ca82dda-5ae3-499c-8052-2a8424e8604c&_gl=1*7hqilr*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTIyNjQuNTIuMC4w",
      designation: "Domain Director (Web & DevOps)",

      linkedin: "https://www.linkedin.com/in/charul-nampalliwar-43148b22a/",
    },
    {
      name: "Mikhiel Benji",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FMikhiel%20Benji.jpeg?alt=media&token=1cdd2bfb-86a3-440f-ac4a-230d807a7629&_gl=1*1fme0tg*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQ4NDguNTEuMC4w",
      designation: "Domain Director (Competitive Programming)",

      linkedin: "https://www.linkedin.com/in/mikhiel-benji-5061b2285/",
    },
    {
      name: "Riddhi Kulkarni",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FRiddhi%20Kulkarni.jpeg?alt=media&token=b07a7b89-3ba2-459b-bb9b-15672843465e&_gl=1*1tdw4s4*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQ0NjguNjAuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/riddhi-kulkarni-9a6b84232/",
    },
    {
      name: "Aditya Mahajan",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAditya%20Mahajan.jpg?alt=media&token=2ca95b13-5864-404a-be5c-f07fb0da7af1&_gl=1*17seipe*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU5NjcxMi4xMy4xLjE2OTc1OTg0OTAuMzguMC4w",
      designation: "Domain Director (Competitive Programming)",

      linkedin: "https://www.linkedin.com/in/aditya-mahajan-b5b8b7229/",
    },
    {
      name: "Varad Pundlik",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FVarad%20Pundlik.jpg?alt=media&token=e4ddfb87-db70-455a-b00c-ff6359a1fd6e&_gl=1*gegsg1*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU5NjcxMi4xMy4xLjE2OTc1OTcxNjMuNDcuMC4w",
      designation: "Domain Director (Competitive Programming)",

      linkedin: "https://www.linkedin.com/in/varad-pundlik-3a6178205/",
    },
    {
      name: "Awadhoot Khutwad",

      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAwadhooooot.jpg?alt=media&token=90d9e81b-cf40-4f3e-92fb-f8bc1bb9ea9e&_gl=1*da9nx*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTI0MTQuMy4wLjA",
      designation: "Marketing Head",

      linkedin: "https://www.linkedin.com/in/awadhoot-khutwad-47879a22a/",
    },
    {
      name: "Soumya Garg",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FSoumyaGarg.jpeg?alt=media&token=a72ae26e-e954-41bf-9f76-43ed7bf2eb8d&_gl=1*q9efpy*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTI0NjQuNjAuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/soumya-garg-3a7453166/",
    },
    {
      name: "Aditi Date",

      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAditi%20Date.jpg?alt=media&token=382ab584-a604-4deb-b986-9c31ab7fc07a&_gl=1*vv28r5*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTIzNzUuNDIuMC4w",
      designation: "Domain Director (App)",

      linkedin: "https://www.linkedin.com/in/aditi-date-43a16022a/",
    },
    {
      name: "Ankita Darade",

      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAnkita_Darade.jpg?alt=media&token=0c3c3326-10cd-4178-9e2f-183e414bec83&_gl=1*sprmjn*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTI0MDYuMTEuMC4w",
      designation: "Domain Director (ML & AI)",

      linkedin: "https://www.linkedin.com/in/ankita-darade-a0371a239/",
    },
    {
      name: "Advait Naik",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAdvait.jpg?alt=media&token=b2385831-4364-44d1-8f50-0c8dc7c11999&_gl=1*1dfdudc*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTU3ODguMzUuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/advait-naik-344689245/",
    },
    {
      name: "Anshika Singh",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2Fanshikasingh.jpg?alt=media&token=af209901-331a-4148-a582-afe6f127f8fb&_gl=1*8ygq1w*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTI1MTIuMTIuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/anshika-singh-057093224/",
    },
    {
      name: "Tarun Santani",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FTarunSantani.png?alt=media&token=94636b63-228f-4cec-b4c3-bf4eff81df95&_gl=1*1rr0jzm*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTI1MzYuNjAuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/tarun-santani-6a875022b/",
    },
    {
      name: "Aniket Kolte",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAniket_Kolte.jpeg?alt=media&token=f1ce9055-4705-495d-9e94-95b5ee4f46e1&_gl=1*1qbrpy1*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTI1ODUuMTEuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/aniket-kolte-19b9631a1/",
    },
    {
      name: "Om Lachure",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FOm_Lachure.jpg?alt=media&token=13541c2a-b0a2-46e9-ae38-92c255e1707c&_gl=1*jdkluu*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTI4MDAuNy4wLjA",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/om-lachure-644104264/",
    },
    {
      name: "Rushi Balapure",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FRushi%20Balapure_.jpg?alt=media&token=5c1030fa-6abb-4b2b-a02a-61b4adc2d496&_gl=1*1aqzy17*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTMxNDguNDIuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/rushi-balapure-75148022a/",
    },
    {
      name: "Tanisha Bharadiya",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FTanisha_Bharadiya.jpg?alt=media&token=f533c3a2-aac6-4044-ade5-2d3bf1094457&_gl=1*885v4p*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTMxNTkuMzEuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/tanisha-bharadiya-313b6a246/",
    },
    {
      name: "Siddhi Hajare",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FSiddhi%20Hajare.png?alt=media&token=0f51e50d-5285-4097-aea9-b6013f676093&_gl=1*18rhuml*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTMyMTkuNjAuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/siddhi-hajare-6b8419222/",
    },
    {
      name: "Atharva Date",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAtharva_Date.jpg?alt=media&token=3be34f78-cd54-4a2c-a508-414cfa108c74&_gl=1*ui5wd2*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTMzODYuNDYuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/atharva-date-04345b256/",
    },
    {
      name: "Ganesh Patil",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FGanesh%20Patil.jpg?alt=media&token=855e0d73-94af-44d3-a27b-a3f743118bb6&_gl=1*8cksz1*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQwNzIuNjAuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/ganesh-patil-a74a7b249/",
    },
    {
      name: "Kedar Pawar",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FKedarPawar.jpg?alt=media&token=4ad2b270-6de9-4464-b8a8-0dd540cf8f01&_gl=1*3ttrft*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQxNzQuNTIuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/kedar-pawar-02554122a/",
    },
    {
      name: "Anushka Joshi",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAnushka%20Joshi.jpg?alt=media&token=a9d66461-808e-4def-998e-521498329a72&_gl=1*1c3b3uy*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQxMDIuMzAuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/anushka512/",
    },
    {
      name: "Madhushri Wagh",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FMadhushri%20Wagh.jpg?alt=media&token=c564a4fb-a0ab-4c25-a438-3320e16ef0a5",
      designation: "Content Head",
      linkedin: "https://www.linkedin.com/in/madhushriwagh/",
    },
    {
      name: "Shivam Chandak",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FShivamChandak.jpeg?alt=media&token=f8940ca1-03cd-4295-a191-3f94b6f673a9&_gl=1*1ms401m*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQ1NTcuNTkuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/shivam-chandak-6506a022a/",
    },
    {
      name: "Shraddha Asolkar",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FShraddha%20Asolkar.jpg?alt=media&token=8955ae46-e218-47de-bbdd-daeac38bad89&_gl=1*1td7b54*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQ2OTMuMzIuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/shraddha-asolkar-1a7104236/",
    },
    {
      name: "Atharva Pardeshi",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FAtharva%20Pardeshi_.jpg?alt=media&token=bcc6c5b4-8496-4dad-93a9-311f90fe9e77&_gl=1*e1f1o8*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQyMTEuMTUuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/atharva-pardeshi-01054b237/",
    },
    {
      name: "Rohit Kuvar",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FRohit%20Kuvar_.jpg?alt=media&token=becebe96-041e-4f9f-bddc-adf2727418cb&_gl=1*v48xl1*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQzOTkuNjAuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/rohit-kuvar-821309136/",
    },
    {
      name: "Kishanlal Choudhary",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FKishanlal_Choudhary.jpg?alt=media&token=354aaa2d-2c81-405a-8524-b5300adb31b8&_gl=1*op0uut*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQyNzcuNjAuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/kishanlal-choudhary-a94154217/",
    },
    {
      name: "Aditya Malu",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FMaluuuuuu.jpg?alt=media&token=ba94365b-7dec-40fe-a040-0aad6d4047c4&_gl=1*jv9zi8*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTI3NDguNTkuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/aditya-malu-2aa0a022a/",
    },
    {
      name: "Shravani Kamthankar",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/pulzion-team-page.appspot.com/o/Leads%2FShravani%20Kamthankar.jpg?alt=media&token=d7e53549-5bf5-45e2-aea3-597db8623eb1&_gl=1*1j6t0gh*_ga*NjI2MTcyMDc3LjE2OTI1ODY4OTM.*_ga_CW55HF8NVT*MTY5NzU1MTUxNi4xMi4xLjE2OTc1NTQxOTQuMzIuMC4w",
      designation: "Creative Head",
      linkedin: "https://www.linkedin.com/in/shravani-kamthankar-307242239/",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Pulzion | Team</title>
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
        <SectionHeading>Team Pulzion</SectionHeading>
        <div className="grid items-center justify-center grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-20">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              name={profile.name}
              avatar={profile.avatar}
              // designation={profile.designation}
              linkedin={profile.linkedin}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;
