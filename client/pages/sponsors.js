import Head from "next/head";
import Layout from "../Components/Layout";
import Sponsors from "../Components/Sponsors";
import { IoCall } from "react-icons/io5";
import SponsorsCard from "../Components/SponsorsCard";
import SectionHeading from "../Components/SectionHeading";

export default function Home() {

  const sponsors = [
    {
      "id": 1,
      "name": "Mithi Softwares",
      "imgUrl": "./mithi_new.png",
      "type": "Associate Sponsor",

    },
    {
      "id": 2,
      "name": "Jamboree",
      "imgUrl": "./jamboree_white8.png",
      "type": "Event Sponsor",

    },
    {
      "id": 3,
      "name": "Postman",
      "imgUrl": "./postman.png",
      "type": "Workshop Partner",

    },
    {
      "id": 4,
      "name": "Interview Buddy",
      "imgUrl": "./InterviewBuddy_Logo2.png",
      "type": "Education Partner",

    },
    {
      "id": 5,
      "name": "Give My Certificate",
      "imgUrl": "./GMC LogoS.png",
      "type": "Certificate Partner",

    },
    {
      "id": 6,
      "name": "Nestle",
      "imgUrl": "./nestle.png",
      "type": "Refreshment Partner",

    },
    {
      "id": 7,
      "name": "Budhani Bros",
      "imgUrl": "./budhani2.png",
      "type": "Snack Partner",

    },
    {
      "id": 8,
      "name": "Smoodh Lassi",
      "imgUrl": "./smoodh_lassi.jpg",
      "type": "Refreshment Partner",
    }
    
  ];

  return (
    <Layout>
      <Head>
        <title>Pulzion | Sponsors</title>
      </Head>
      <div className="container py-8 mx-auto">
        <SectionHeading children={"Sponsors"} />
        <div className="flex items-center justify-center mt-10">
          <SponsorsCard  
                name = "Magicflare"
                imgUrl = "./magicflare_sponsors_new.png"
                type = "Title Sponsor"
          />
        </div>
        <div className="flex flex-wrap items-center justify-around w-full h-full py-2">
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
      </div>

      {/* <Sponsors></Sponsors> */}
    </Layout>
  );
}
