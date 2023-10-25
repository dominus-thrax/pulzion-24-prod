import React, {
    useState,
    useImperativeHandle,
    useRef,
    useEffect,
    useContext,
} from "react";

import { MdAdd } from "react-icons/md";
import { toast } from "react-hot-toast";

import ToolTipButton from './Button/ToolTipButton';
import { userRegisterEvent } from "../action/registeration";
import AppContext from "../context/AppContext";
import { addCombo, addItem } from '../action/cart';
import PrimaryButton from './Button/PrimaryButton';
import { useRouter } from "next/router";

const EventDetails = ({ event }) => {
    const router = useRouter();

    const [id, setId] = useState(null);
    useEffect(() => {
        setId(event.id);
    }, [event])

    console.log("Events");
    console.log(event)

    // id = parseInt(id);
    const [slots, setSlots] = useState([]);
    const [active, setActive] = useState(-1);
    const [combo_id, setComboId] = useState(null)
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    // const closedEvents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const closedEvents = [];

    // console.log("Props Event: ")
    // console.log(event);


    const { contEvents, user, dispatchEvents } = useContext(AppContext);
    // const description = seperateLine(props.description);
    // const rules = seperateLine(props.rules ? props.rules : "");
    // const rounds = seperateLine(props.rounds ? props.rounds : "");
    // const teams = seperateLine(props.teams ? props.teams : "");
    // const notes = seperateLine(props.notes ? props.notes : "");
    const isLoggedIn = !!user?.id;

    const alreadyRegistered = isLoggedIn
        ? !!contEvents.find((item) => item.id === id)?.id
            ? true
            : false
        : false;
    const registeredEvent = alreadyRegistered
        ? contEvents.find((item) => item.id === id)
        : undefined;

    // TEST  event
    // useEffect(() => {
    //     console.log('events', event)
    //     console.log("Already ?", alreadyRegistered)
    //     console.log(contEvents)
    // }, [event])

    //Slots - 
    const fetchSlots = async () => {
        try {
            setLoading(true);
            const data = await getSlots(id);
            if (data?.error) {
                toast.error(data.error);
                return;
            }
            if (data?.slots?.length > 0) {
                setSlots(data?.slots);
                setLoading(false);

            } else {
                toast.error("Slot booking isn't active for this event!");
            }
        } catch (e) {

            toast.error("Something went wrong");
        }
        setLoading(false);
    };


    // Handle Booking - 
    const handleBook = async (slot_id) => {
        try {
            setLoading(true);
            const data = await bookSlot(props.id, slot_id, dispatchEvents);
            if (data?.error) {
                toast.error(data.error);
            } else {
                setSlots([]);
                toast.success("Slot Booked");
            }
        } catch (e) {
            toast.error("Something went wrong");
        }
        setLoading(false);
    };

    // Add to cart
    const handleAddToCart = async () => {
        console.log("add to cart");
        try {
            setLoading(true);
            const res = await addItem(id);
            if (res.data?.error) {
                toast.error(res.data.error);
                setLoading(false);
                return;
            }
            setLoading(false);
            console.log("Single Event Res: ")
            console.log(res.data)
            toast.success(res.data.msg);
        } catch (e) {

            setLoading(false);
            console.log(e);
            toast.error(e);
        }
    };

    //Add Comboo
    const handleAddComboToCart = async (id) => {
        console.log("AddComboId", id)
        if (!id) {
            toast.error("Combo not available");
        }
        try {
            const res = await addCombo(id);

            if (res.data?.error) {
                toast.error(res.data.error);
                return;
            }
            console.log(res);
            setLoading(false);
            toast.success("Combo Added to Cart!");
            //Redirect to cart Page
            // router.push("/cart");

        } catch (e) {

            setLoading(false);
            console.log(e);
            toast.error(e);
        }
    }
    //Handle Register
    const handleRegister = async () => {
        try {
            const data = await userRegisterEvent(id, dispatchEvents);
            if (data?.error) {
                toast.error(data.error);
                return;
            }
            toast.success("Successfully registered!");
        } catch (e) {

            toast.error("Something went wrong");
        }
    };

    return (
        <div className="event_details  text-gray-50 mont_font m relative  bg-center p-6 md:p-12   bg-no-repeat bg-cover flex justify-center overflow-hidden">
            <div className="absolute z-0 inset-0 container mx-auto my-10 bottom-0 w-full  bg-[url('/event_info_bg.png')] top-28 left-0 right-0 bg-cover bg-no-repeat opacity-40 bg-center "></div>


            {/* Event Details Section */}
            <div className="w-full flex-col mont_font shadow-[1px_3px_26px_2px_#dd6b20] md:flex-row container max-w-screen-xl min-h-[80vh] pb-8 pt-2 mx-auto flex gap-3  z-10  bg-slate-800 bg-opacity-50  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm ">
                {/* Event Buy and Combo section */}
                <div className="md:w-5/12  mont_font flex flex-col h-full items-center px-8 border-r border-gray-400">
                    <div className="relative flex items-center justify-center px-10 py-14  w-80 h-80 z-50">
                        <div className="absolute top-1/2 transform -translate-y-1/2 " >
                            <img src="/halloween_frame.png" alt="" />
                        </div>
                        <div className="img-logo bg-slate-900 w-full h-full flex items-center justify-center">
                            <img src={event?.logo} className='w-28 h-28 z-0' />

                        </div>
                    </div>
                    <h2 className=" text-white text-3xl tracking-widest  primary_font">{event?.name}</h2>
                    {/* Price Location Section */}
                    <div className="price_venue mt-4 flex items-center justify-center">
                        <div className="loc p-3">
                            <h5 className='text-right text-xl font-medium'>{event.mode}</h5>
                            <p className="text-xs text-right text-gray-300">Location</p>
                        </div>
                        <div className="h-full my-3 w-[1.5px] bg-gray-500"></div>
                        <div className="price p-3">
                            <h5 className='text-left text-xl font-medium'>₹{event.price}</h5>
                            <p className="text-xs text-left text-gray-300">Fees</p>
                        </div>
                    </div>
                    {/* Button To Buy */}
                    {!isLoggedIn ? (
                        <button
                            className="inline-block text-black mt-4 font-semibold rounded-md border-0 bg-[#FF7518]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20"
                            onClick={() => {
                                setIsVisible(false);
                                router.push("/register/");
                            }}
                        >
                            Login/SignUp to Register
                        </button>
                    ) : (
                        !alreadyRegistered && (
                            <span>
                                {event.price > 0 ? (
                                    <ToolTipButton
                                        loading={loading}
                                        text={
                                            closedEvents.includes(event.id)
                                                ? "Event Closed"
                                                : `Add to Cart`
                                        }
                                        handleConfirm={
                                            closedEvents.includes(event.id)
                                                ? () => {
                                                    toast.error(
                                                        "Registration for this event has been Closed"
                                                    );
                                                }
                                                : handleAddToCart
                                        }
                                    />
                                ) : (
                                    <ToolTipButton
                                        loading={loading}
                                        text={`Register`}
                                        handleConfirm={handleRegister}
                                    />
                                )}
                            </span>
                        )
                    )}
                    {isLoggedIn && alreadyRegistered && (
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {!registeredEvent?.fk_slot && id !== 1 && (
                                <button
                                    className="px-5 py-2 tracking-wider text-white uppercase duration-500 ease-in-out rounded-md bg-orange-500 hover:bg-orange-700"
                                    onClick={
                                        slots?.length > 0 ? () => setSlots([]) : fetchSlots
                                    }
                                    // onClick={
                                    //     () => toast.warn("Slot booking for this event has not started yet!")
                                    // }
                                >
                                    {slots?.length > 0 ? "Cancel" : "Book Slot"}
                                </button>
                            )}
                            {event.play && (
                                <a
                                    className="px-5 py-2 tracking-wider hover:cursor-pointer text-white uppercase duration-500 ease-in-out rounded-md bg-orange-500 hover:bg-orange-700"
                                    href={id === 1 ? "https://www.codechef.com/CODL2023" : event.link}
                                    target="_blank"
                                    // onClick={() => {
                                    //     toast.warn('Event hasn\'t started yet.')
                                    // }}
                                >
                                    Play
                                </a>
                            )}
                        </div>
                    )}
                    <p className="text-justify text-md mt-6">{event.description}</p>
                    <p className='text-start mt-4 font-semibold'>Team Details :</p>
                    <hr className="border-b border-gray-400" />
                    <p className="text-justify text-md mt-2"> {event.teams.split('\n').map(str => <p>{str}</p>)}</p>
                    <p className='text-start mt-4 font-semibold'>Event coordinartor :</p>
                    <hr className="border-b border-gray-400" />
                    <p className="text-justify text-md mt-2"> {event.notes.split('\n').map(str => <p>{str}</p>)}</p>
                </div>
                <div className="md:w-7/12 flex flex-col p-4 pt-0 md:pr-12">
                    <h5 className='text-xl mt-8 font-semibold '>Rounds</h5>
                    <hr className="border-b border-gray-400" />
                    <p className='text-md '>{event.rounds.split('\n').map(str => <p>{str}</p>)
                    }</p>
                    <h5 className='text-xl mt-8  font-semibold'>Rules and Regulations</h5>
                    <hr className="border-b border-gray-400" />
                    <p className='text-md '>{event.rules.split('\n').map(str => <p>{str}</p>)}</p>
                    {/* Combo Item */}
                    <div className="combo_list">
                        < h5 className='text-xl font-semibold mt-8' > Events Combos</h5>
                        <hr className="border-b border-gray-400" />
                        <div className=" flex-row combo-details flex gap-6 mt-4 overflow-x-scroll ">
                            {((isLoggedIn || !alreadyRegistered) && event.offers) ? event.offers.map((item, index) => (
                                <div className="combo_card overflow-hidden relative flex p-4 border border-orange-200 rounded-2xl flex-col items-center justify-center bg-slate-900 bg-opacity-80 md:w-52">
                                    <h5 className="text-md font-semibold text-center mb-3">{item.combo_name}</h5>
                                    <ul className="combo_body flex rounded-2xl flex-col items-center justify-start overflow-y-auto max-h-60">
                                        {
                                            item.array_of_evname.map((item, index) => (
                                                <li key={index} className="combo_event w-full flex justify-around items-center">
                                                    <div className="w-1/4 py-2">
                                                        <img src={item.logo} className='h-14 z-0 object-contain' alt={`Logo for ${item.name}`} />
                                                    </div>
                                                    <p className='px-4 w-3/4 text-md'>{item.name}</p>
                                                </li>
                                            )).reduce((prev, curr, index, arr) => (
                                                index === arr.length - 1 ? [prev, curr] : [prev, curr, <MdAdd key={`separator-${index}`} color="white" size="18" />]
                                            ), [])
                                        }
                                    </ul>
                                    <div className="flex justify-between items-center mt-3 gap-5 w-full">

                                        {
                                            isLoggedIn ? (
                                                <PrimaryButton onClick={() => handleAddComboToCart(item.id)} class="inline-block font-semibold rounded-md border-0 bg-[#FF7518]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20" >
                                                    Add+
                                                </PrimaryButton>
                                            ) : (
                                                <button
                                                    className="inline-block mt-0 text-black font-semibold rounded-md border-0 bg-[#FF7518]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20"
                                                    onClick={() => {
                                                        toast.warn("Login/Signup to add to cart");
                                                        setIsVisible(false);
                                                        router.push("/register/");
                                                    }}
                                                >
                                                    Add+
                                                </button>
                                            )
                                        }



                                        <div className="flex flex-col">
                                            <p className="text-xs font-medium line-through">₹{item.total_price}</p>
                                            <p className=" font-semibold mt-1 text-xl">₹{item.discounted_price}</p>
                                        </div>
                                    </div>
                                </div>
                            )) :
                                <div className="h-full w-full flex items-center justify-center">
                                    <h4 className='text-xl '>
                                        Combos are coming soon.....
                                    </h4>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default EventDetails