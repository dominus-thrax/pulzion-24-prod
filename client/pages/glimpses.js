import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../Components/Layout";
import Image from "next/image";
import { SRLWrapper } from "simple-react-lightbox";
import SectionHeading from "../Components/SectionHeading";
import { images } from "../data/glimpsesGallery";

const PreviousGlimpses = () => {

  return (
    <Layout>
      <Head>
        <title>Pulzion'23 | Glimpses</title>
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
      <div className="px-4 py-5 sm:px-8 md:px-12 lg:px-16 md:py-10">
        <div className="flex justify-center mb-10">
          <SectionHeading>Glimpses of Events Conducted By PASC.</SectionHeading>
        </div>
        <SRLWrapper>
          <div className="flex flex-wrap justify-center gap-6">
            {images.pulzion.map((image) => {
              return (

                <a
                  href={image.thumbnail}
                // key={image.key}
                >
                  <Image
                    src={image.thumbnail}
                    width={400}
                    height={300}
                    className="shadow-xl rounded-xl"
                    srl_gallery_image="true" // Add this if your thumbnail is not recognized
                  />
                </a>
              )
            })}
          </div>
        </SRLWrapper>
      </div>
    </Layout>
  );
};

export default PreviousGlimpses;
