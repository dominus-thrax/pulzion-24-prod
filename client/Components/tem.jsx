import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header';
import Layout from '../../Components/Layout';
import { useRouter } from 'next/router'
import { getAllEvents, getEvent } from '../../action/registeration';

const EventDetails = () => {

    const router = useRouter();
    let { id } = router.query;
    id = parseInt(id);
    const [active, setActive] = useState(-1);
    const [loading, setLoading] = useState(true);
    try {

        console.log(id)
    } catch (e) {
        console.log(e)
    }

    //Selected Data
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            // const data = getAllEvents();
            // await getAllEvents().then(data =>setEvents(data)).catch(err=>console.log(err));
            // setEvents(data)
            console.log('id', id);
            getEvent(id).then(res => setData(res.events)).catch(err => console.log(err))
            // console.log(getAllEvents())
            setLoading(false);
        }
        fetchEvents();
    }, []);

    // Select Data
    useEffect(() => {
        // if (events.length > 0) {
        // setData(events[id])

        // }
        console.log('events', data)
    }, [event])






    return (
        <Layout>
            <div className=" text-gray-50  m relative  bg-center p-6 md:p-12   bg-no-repeat bg-cover flex justify-center overflow-hidden">
                <div className="absolute z-0 inset-0 container mx-auto my-10 bottom-0 w-full  bg-[url('/event_info_bg.png')] top-28 left-0 right-0 bg-cover bg-no-repeat opacity-40 bg-center "></div>


                {/* Event Details Section */}
                <div className="w-full flex-col shadow-[0px_2px_15px_5px_#ebf4ff] md:flex-row container max-w-screen-xl min-h-[80vh] pb-8 pt-2 mx-auto flex gap-3  z-10  bg-slate-900 bg-opacity-50  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm ">
                    {/* Event Buy and Combo section */}
                    <div className="md:w-5/12  flex flex-col h-full items-center px-8 border-r border-gray-400">
                        <div className="relative flex items-center justify-center  w-80 h-80 bg-[url('/halloween_frame.png')] bg-center bg-contain bg-no-repeat p-2 z-50">
                            <img src='/eventLogos/Recode.png' className='w-28 h-28 z-0' />
                        </div>
                        <h2 className="font-bold text-white text-3xl">{data.name}</h2>
                        {/* Price Location Section */}
                        <div className="price_venue mt-4 flex items-center justify-center">
                            <div className="loc p-3">
                                <h5 className='text-right text-xl font-medium'>{data.mode}</h5>
                                <p className="text-xs text-right text-gray-300">Location</p>
                            </div>
                            <div className="h-full my-3 w-[1.5px] bg-gray-500"></div>
                            <div className="price p-3">
                                <h5 className='text-left text-xl font-medium'>₹{data.price}</h5>
                                <p className="text-xs text-left text-gray-300">Fees</p>
                            </div>
                        </div>
                        {/* Button To Buy */}
                        <button class="inline-block text-black mt-4 font-semibold rounded-md border-0 bg-[#ff8415]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20" >
                            <span class="inline-block relative transition duration-700">Login/Sign up to Register <span class="absolute opacity-0 top-0 right-0 transition duration-700">for free</span></span>
                        </button>
                        <p className="text-center text-sm mt-6">{data.description}</p>
                        <p className="text-sm mt-2">Event coordinartor : {data.notes}</p>
                    </div>
                    <div className="md:w-7/12 flex flex-col p-4 pt-0 md:pr-12">
                        <h5 className='text-xl font-semibold mt-4'>Rounds</h5>
                        <hr className="border-b border-gray-400" />
                        <p className='text-sm'>{data.rounds}</p>
                        <h5 className='text-xl mt-2 font-semibold'>Rules and Regulations</h5>
                        <hr className="border-b border-gray-400" />
                        <p className='text-sm'>{data.rules}</p>

                        <h5 className='text-xl font-semibold mt-4'>Events Combos</h5>

                        <div className=" combo-details flex gap-6 mt-4 overflow-x-scroll ">
                            {/* Combo Item */}


                            {
                                data.offers ? data.offers.map((item, index) => (
                                    <div className="combo_card flex p-4  rounded-2xl flex-col items-center justify-center bg-slate-900 bg-opacity-80 w-10/12 md:w-1/3">
                                        {

                                            item.array_of_evname.map((item, index) => (
                                                <div className="combo_event w-full px-4 flex justify-around items-center">
                                                    <img src={item.logo} className=' h-14 z-0 w-1/4' />
                                                    <p className='px-4 w-3/4'>{item.name}</p>
                                                </div>))
                                        }
                                        <div className="flex justify-between items-center mt-3 gap-5 w-full">
                                            <button class="inline-block text-black font-semibold rounded-md border-0 bg-[#ff8415]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20" >
                                                Add+
                                            </button>
                                            <div className="flex flex-col">
                                                <p className="text-xs font-medium line-through">₹{item.total_price}</p>
                                                <p className="text-sm font-semibold text-md">₹{item.discounted_price}</p>
                                            </div>
                                        </div>

                                    </div>
                                )) :
                                    <div className="h-full w-full flex items-center justify-center">
                                        <h4>
                                            No Combos Available
                                        </h4>
                                    </div>

                            }



                        </div>
                    </div>



                </div>


            </div>


        </Layout >
    )
}

export default EventDetails