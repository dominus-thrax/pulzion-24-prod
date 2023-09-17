import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../Components/Layout";
import Image from "next/image";
import { SRLWrapper } from "simple-react-lightbox";
import SectionHeading from "../Components/SectionHeading";
import { getAdminSlots } from "../action/gallery";
import ContentLoader from "../Components/ContentLoader";

const PreviousGlimpses = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await getAdminSlots();
        if (data?.error) {
          
          setLoading(false);
          return;
        }
        setImages(data.gallery);
      } catch (e) {
        
      }
      setLoading(false);
    };
    loadImages();
  }, []);

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
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-5 md:py-10">
        <div className="flex justify-center mb-10">
          <SectionHeading>Glimpses of Events Conducted By PASC.</SectionHeading>
        </div>
        {loading ? (
          <ContentLoader />
        ) : (
          <SRLWrapper>
            <div className="flex flex-wrap gap-6 justify-center">
              {images.slice(1).map((image) => (
                <a
                  href={`https://pulzion-website-images.s3.ap-south-1.amazonaws.com/${image.Key}`}
                  key={image.key}
                >
                  <Image
                    src={`https://pulzion-website-images.s3.ap-south-1.amazonaws.com/${image.Key}`}
                    // alt={`gallery ${image.Key}`}
                    width={400}
                    height={300}
                    className="rounded-xl shadow-xl"
                    srl_gallery_image="true" // Add this if your thumbnail is not recognized
                  />
                </a>
              ))}
            </div>
          </SRLWrapper>
        )}
      </div>
    </Layout>
  );
};

export default PreviousGlimpses;
