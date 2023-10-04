import React, { useState } from 'react'
import Header from '../Components/Header'
import EventAccordian from '../Components/EventAccordian';
import Layout from '../Components/Layout';


const data =
{
    "id": 1,
    "name": "CodeX",
    "description": "Do you want to win prizes with beginner-level CP skills? Here is your chance. Pulzion'23 brings to you CodeX to bag prizes with rookie coding skills. Get ready to race against time and code your way up to the top!",
    "type": "Technical",
    "mode": "Offline",
    "is_active": true,
    "play": true,
    "price": 20,
    "link": null,
    "tagline": "“Hello there, CP enthusiast!”",
    "logo": "https://pulzion-website-images.s3.ap-south-1.amazonaws.com/logos/Code+X.png",
    "rules": "1. Only 1st year students from PICT can participate in this event.\n2. The 1st round will consist of 20 MCQs which participants have to answer within 15 minutes.\n3. In the 2nd round, shortlisted participants will have to code for the given problems. For this round, sample code snippets for basic loops(for, while) or conditional statements(if, elseif, else) will be given.",
    "rounds": "Round 1:\nThis is an MCQ round consisting of questions based on various mathematical concepts.\nRound 2:\nIn this round, qualified participants will have to write code for a given set of problems. The questions are simple and designed for 1st year students.",
    "teams": "FE: Individual",
    "notes": "Akankasha Waghmare - 91304 94725",
    "created_at": "2023-10-03T07:32:16.418Z",
    "updated_at": "2023-10-03T07:32:16.418Z",
    "offers": [
        {
            "id": 1,
            "combo_name": "combo1",
            "array_of_evid": [
                1,
                2,
                3
            ],
            "array_of_evname": [
                "CodeX",
                "Electroquest",
                "Web&App"
            ],
            "total_price": "60.00",
            "discounted_price": "45.00",
            "combo_status": true,
            "terms_c": {
                "1": "valid till 15 oct"
            }
        },
        {
            "id": 2,
            "combo_name": "combo2",
            "array_of_evid": [
                1,
                5,
                7
            ],
            "array_of_evname": [
                "CodeX",
                "Dextrous",
                "Insight"
            ],
            "total_price": "60.00",
            "discounted_price": "45.00",
            "combo_status": false,
            "terms_c": {
                "1": "valid till 15 oct"
            }
        },
        {
            "id": 5,
            "combo_name": "combo4",
            "array_of_evid": [
                1,
                2,
                3,
                7
            ],
            "array_of_evname": [
                "CodeX",
                "Electroquest",
                "Web&App",
                "Insight"
            ],
            "total_price": "60.00",
            "discounted_price": "45.00",
            "combo_status": false,
            "terms_c": {
                "1": "valid till 15 oct"
            }
        }
    ]
}

const tabs = [
    {
        id: 1,
        text: "Rounds",
        content: data.rounds,
    },
    {
        id: 2,
        text: "Rules and Regulations",
        content: data.rules,
    },
    {
        id: 3,
        text: "Team Distribution",
        content: data.teams,
    },
    {
        id: 4,
        text: "Event Leads",
        content: data.notes,
    },
];


const eventdetails = () => {

    const [active, setActive] = useState(-1)




    return (
        <Layout>
            <div className=" text-gray-50  m relative  bg-center p-12   bg-no-repeat bg-cover flex justify-center overflow-hidden">
                <div className="absolute z-0 inset-0 container mx-auto my-10 bottom-0 w-full  bg-[url('/event_info_bg.png')] top-28 left-0 right-0 bg-cover bg-no-repeat opacity-40 bg-center "></div>


                {/* Event Details Section */}
                <div className="w-full flex-col shadow-[0px_2px_15px_5px_#ebf4ff] md:flex-row container max-w-screen-xl min-h-[80vh] py-8 mx-auto flex gap-3  z-10  bg-slate-900 bg-opacity-50  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm ">

                    {/* Event Buy and Combo section */}
                    <div className="md:w-5/12  flex flex-col h-full items-center px-8 ">
                        <div className="relative z-[2] w-[170px] sm:w-[210px] sm:h-[210px] h-[170px]">
                            <div className="event-des-logo bg-gray-200 bg-opacity-80 p-5 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md  ">
                                <img src='/eventLogos/Recode.png' />
                            </div>
                        </div>
                        <h2 className="font-bold text-white text-3xl mt-4">{data.name}</h2>
                        {/* Price Location Section */}
                        <div className="price_venue mt-4 flex items-center justify-center">
                            <div className="loc p-3">
                                <h5 className='text-right font-medium'>{data.mode}</h5>
                                <p className="text-xs text-right text-gray-300">Location</p>
                            </div>
                            <div className="h-full my-3 w-[1.5px] bg-gray-500"></div>
                            <div className="price p-3">
                                <h5 className='text-left font-medium'>₹{data.price}</h5>
                                <p className="text-xs text-left text-gray-300">Fees</p>
                            </div>
                        </div>

                        {/* Button To Buy */}
                        <button class="inline-block text-black mt-4 font-semibold rounded-md border-0 bg-[#ff8415]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20" >
                            <span class="inline-block relative transition duration-700">Login/Sign up to Register <span class="absolute opacity-0 top-0 right-0 transition duration-700">for free</span></span>
                        </button>

                        <p className="text-center text-sm mt-6">{data.description}</p>

                    </div>
                    <div className="md:w-7/12 flex flex-col p-4 pt-0 ">
                        <h5 className='text-xl font-semibold'>Rounds</h5>
                        <p className='text-sm'>{data.rounds}</p>
                        <h5 className='text-xl mt-2 font-semibold'>Rules and Regulations</h5>
                        <p className='text-sm'>{data.rules}</p>
                        {/*<h5 className='text-xl font-semibold'>Team Distribution</h5> 
                        <p>{data.rules}</p>
                        <h5 className='text-xl font-semibold'>Event Leads</h5>
                        <p>{data.rules}</p> 
                         <h5 className='text-xl font-semibold'>Rounds</h5>
                        <p>{data.rounds}</p>
                        <h5 className='text-xl font-semibold'>Rules and Regulations</h5>
                        <p>{data.rules}</p>
                        <h5 className='text-xl font-semibold'>Team Distribution</h5>
                        <p>{data.rules}</p>
                        <h5 className='text-xl font-semibold'>Event Leads</h5>
                        <p>{data.rules}</p> */}

                        {/* {tabs.map((tab) => (
                            <EventAccordian
                                key={tab.id}
                                title={tab.text}
                                activeIndex={active}
                                setActiveIndex={setActive}
                                index={tab.id}
                            >
                                {/* {tab.content.map((txt) => ( 
                        <p
                            className="text-lg font-normal text-primaries-100 font"
                            key={tab.id}
                        >
                            {tab.content}
                        </p>
                        {/* ))}
                    </EventAccordian>
                        ))} */}


                    </div>



                </div>


            </div>


        </Layout >
    )
}

export default eventdetails