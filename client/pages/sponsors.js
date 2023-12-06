import Head from "next/head";
import Layout from "../Components/Layout";
import Sponsors from "../Components/Sponsors";
import { IoCall } from "react-icons/io5";
import SponsorsCard from "../Components/SponsorsCard";
import SectionHeading from "../Components/SectionHeading";

export default function Home() {
  const sponsors = [
    {
      id: 1,
      name: "GrowthyfAI",
      imgUrl: "./growthyfAI.png",
      type: "Associate Sponsor",
    },
    {
      id: 2,
      name: "Jamboree",
      imgUrl: "./jamboree_white8.png",
      type: "Event Sponsor",
    },
    {
      id: 3,
      name: "Give My Certificate",
      imgUrl: "./GMC LogoS.png",
      type: "Certificate Partner",
    },
    {
      id: 4,
      name: "Budhani Bros",
      imgUrl: "./budhani2.png",
      type: "Snack Partner",
    },
    {
      id: 5,
      name: "Parle Agro",
      imgUrl: "./parle-agro.png",
      type: "Hydration Partner",
    },
    {
      id: 6,
      name: "Campus Sponsers",
      imgUrl: "./campus-times.png",
      type: "Media Partner",
    },

    // {
    //   id: 8,
    //   name: "Smoodh Lassi",
    //   imgUrl: "./smoodh_lassi.jpg",
    //   type: "Refreshment Partner",
    // },
  ];

  return (
    <Layout>
      <Head>
        <title>Pulzion | Sponsors</title>
      </Head>
      <div className="items-center justify-center  overflow-x-hidden">
        <div className="container w-fit text-center text-white text-4xl py-8 mx-auto min-h-screen overflow-x-hidden">
          <SectionHeading children={"Sponsors"} />
          {/* <div className="flex items-center justify-center mt-10"> */}
          {/* <SponsorsCard  
                name = "Magicflare"
                imgUrl = "./magicflare_sponsors_new.png"
                type = "Title Sponsor"
          /> */}
          {/* </div> */}

          <div className="flex flex-wrap items-center justify-around h-full py-2">
            {
              sponsors.map((sponsor) => {
                return (
                  <SponsorsCard
                    key={sponsor.id}
                    name={sponsor.name}
                    imgUrl={sponsor.imgUrl}
                    type={sponsor.type}
                  />
                )
              })
            }
          </div>
          <h1 className="container py-8 mx-auto  ">
            We are open for sponsorships!
          </h1>
          <h2 className="text-2xl">Contact Us:</h2>
          <div className="text-xl">
            <h3>
              Om Lachure: <a className="underline " href="tel:9518737103">+91 95187 37103</a>
            </h3>
            <h3>
              Tanisha Bharadiya: <a className="underline " href="tel:7666245993">+91 76662 45993</a>
            </h3>
            <h3>
              Rushi Balapure: <a className="underline " href="tel:8329707611">+91 83297 07611</a>
            </h3>
          </div>
        </div>
      </div>
      {/* <Sponsors></Sponsors> */}
    </Layout>
  );
}
