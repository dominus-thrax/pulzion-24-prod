// import Head from 'next/head';
// import Layout from '../Components/Layout'
// import Sponsors from '../Components/Sponsors'
// import Test from '../Components/Test'
import React from 'react';
import SectionHeading from './SectionHeading';

const sponsors = [
 
  {
    id: '1',
    logo: "https://pulzion22.s3.ap-south-1.amazonaws.com/sponsors/languify-logo.png",
    designation: "Educational Partner",
  },
  {
    id: '2',
    logo: "https://pulzion22.s3.ap-south-1.amazonaws.com/sponsors/GDG+Pune+-+White.png",
    designation: "Community Partner",
  },
  {
    id: '3',
    logo: "https://pulzion22.s3.ap-south-1.amazonaws.com/sponsors/TruScholar+-+Light.png",
    designation: "Credentials Partner",
  },
  {
    id: '4',
    logo: "https://pulzion22.s3.ap-south-1.amazonaws.com/sponsors/Taste_of_Mahabaleshwar-removebg-preview.png",
    designation: "Food Partner",
  },
]

const Sponsors = () => {
  return (
    <div className='px-4 sm:px-8 md:px-12 lg:px-16 py-5 md:py-10'>
      <div className='md:mb-10 mb-20'>
        <SectionHeading>
          Our Sponsors
        </SectionHeading>
      </div>
      <div className='flex flex-wrap justify-center gap-x-5 gap-y-8 items-emd mb-16'>
        <div className='flex flex-col items-center gap-5'>
          <img src='https://pulzion22.s3.ap-south-1.amazonaws.com/sponsors/nirmitee-1-white.png' alt='sponsor' 
            width="700px"
          />
          <p className='text-2xl text-primaries-100 underline font-bold text-center'>Title Sponsors</p>
        </div>

      </div>
      <div className='flex flex-wrap justify-center gap-x-5 gap-y-8 items-emd mb-16'>
        <div className='flex flex-col items-center gap-5'>
          <img src='https://pulzion22.s3.ap-south-1.amazonaws.com/sponsors/Jamboree.png' alt='sponsor' className='w-96'/>
          <p className='text-2xl text-primaries-100 underline font-bold text-center'>Event Sponsor (Dextrous)</p>
        </div>

      </div>
      <div className='flex flex-wrap justify-center gap-x-16 gap-y-20 items-end'>
        {
          sponsors.map((sponsor)=>(
            <div key={sponsor.id} className="flex flex-col items-center text-center gap-5">
                <img  src={sponsor.logo} alt='sponsor' className='w-96' />
                <p className='text-2xl text-primaries-100 underline font-bold'>{sponsor.designation}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Sponsors;