import React, {
    useState,
    useImperativeHandle,
    useRef,
    useEffect,
    useContext,
} from "react";
import { toast } from "react-toastify";

import ToolTipButton from './Button/ToolTipButton';
import { userRegisterEvent } from "../action/registeration";
import AppContext from "../context/AppContext";
import { addItem } from '../action/cart';
import PrimaryButton from './Button/PrimaryButton';
import { useRouter } from "next/router";

const EventDetails = ({ event }) => {
    const router = useRouter();

    const [id, setId] = useState(null);
    useEffect(() => {
        setId(event.id);
    }, [event])



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
    useEffect(() => {
        console.log('events', event)
        console.log("Already ?", alreadyRegistered)
        console.log(contEvents)
    }, [event])

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
    const addCombo = (id) => {
        console.log("AddComboId", id)
        if (!combo_id) {
            setComboId(id);
            localStorage.setItem("combo_id", id);

            let combo_data;

            event.offers.forEach(item => {
                if (item.id == id) {
                    combo_data = item;
                }
            });
            console.log("ComboData");
            console.log(combo_data)
            combo_data.array_of_evname.map((item, index) => {
                addItem(item.id, combo_data.id).then(res => {
                    if (res.data?.error) {
                        toast.error(res.error);
                        return;
                    }

                    console.log("Combo Res: ")
                    console.log(res.data)
                    toast.success(res.data.msg);
                }).catch(err => console.log(err))
            })
        }
        else {
            toast.error("One Combo Already Added")
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
        <div className="event_details text-gray-50 mont_font m relative  bg-center p-6 md:p-12   bg-no-repeat bg-cover flex justify-center overflow-hidden">
            <div className="absolute z-0 inset-0 container mx-auto my-10 bottom-0 w-full  bg-[url('/event_info_bg.png')] top-28 left-0 right-0 bg-cover bg-no-repeat opacity-40 bg-center "></div>


            {/* Event Details Section */}
            <div className="w-full flex-col shadow-[0px_2px_15px_5px_#ebf4ff] md:flex-row container max-w-screen-xl min-h-[80vh] pb-8 pt-2 mx-auto flex gap-3  z-10  bg-slate-900 bg-opacity-50  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm ">
                {/* Event Buy and Combo section */}
                <div className="md:w-5/12  flex flex-col h-full items-center px-8 border-r border-gray-400">
                    <div className="relative flex items-center justify-center  w-80 h-80 bg-[url('/halloween_frame.png')] bg-center bg-contain bg-no-repeat p-2 z-50">
                        <img src={event?.logo} className='w-28 h-28 z-0' />
                    </div>
                    <h2 className="font-bold text-white text-3xl">{event?.name}</h2>
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
                            className="inline-block text-black mt-4 font-semibold rounded-md border-0 bg-[#ff8415]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20"
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
                                    // onClick={
                                    //     slots?.length > 0 ? () => setSlots([]) : fetchSlots
                                    // }
                                    onClick={
                                        () => toast.warn("Slot booking for this event has not started yet!")
                                    }
                                >
                                    {slots?.length > 0 ? "Cancel" : "Book Slot"}
                                </button>
                            )}
                            {event.play && (
                                <a
                                    className="px-5 py-2 tracking-wider hover:cursor-pointer text-white uppercase duration-500 ease-in-out rounded-md bg-orange-500 hover:bg-orange-700"
                                    // href={id === 1 ? "https://www.codechef.com/CDLS2023" : event.link}
                                    // target="_blank"
                                    onClick={() => {
                                        toast.warn('Event hasn\'t started yet.')
                                    }}
                                >
                                    Play
                                </a>
                            )}
                        </div>
                    )}
                    <p className="text-justify text-sm mt-6">{event.description}</p>
                    <p className='text-start mt-4 font-semibold'>Team Details :</p>
                    <hr className="border-b border-gray-400" />
                    <p className="text-start text-sm mt-2"> {event.teams.split('.').map(str => <p>{str}</p>)}</p>
                    <p className='text-start mt-4 font-semibold'>Event coordinartor :</p>
                    <hr className="border-b border-gray-400" />
                    <p className="text-start text-sm mt-2"> {event.notes.split('\n').map(str => <p>{str}</p>)}</p>
                </div>
                <div className="md:w-7/12 flex flex-col p-4 pt-0 md:pr-12">
                    <h5 className='text-xl mt-8 font-semibold '>Rounds</h5>
                    <hr className="border-b border-gray-400" />
                    <p className='text-sm'>{event.rounds.split('\n').map(str => <p>{str}</p>)
                    }</p>
                    {console.log(event.rounds)}
                    <h5 className='text-xl mt-8  font-semibold'>Rules and Regulations</h5>
                    <hr className="border-b border-gray-400" />
                    <p className='text-sm'>{event.rules.split('\n').map(str => <p>{str}</p>)}</p>
                    {/* Combo Item */}
                    <div className="combo_list">

                        < h5 className='text-xl font-semibold mt-8' > Events Combos</h5>
                        <hr className="border-b border-gray-400" />
                        < h4 className='text-2xl font-semibold mt-8  text-center' > Coming Soon...</h4>
                        <div className=" flex-row combo-details flex gap-6 mt-4 overflow-x-scroll ">
                            {((isLoggedIn || !alreadyRegistered) && event.offers) ? event.offers.map((item, index) => (
                                <div className="combo_card flex p-4  rounded-2xl flex-col items-center justify-center bg-slate-900 bg-opacity-80 md:w-52">
                                    {
                                        item.array_of_evname.map((item, index) => (
                                            <div className="combo_event w-full px-4 flex justify-around items-center">
                                                <img src={item.logo} className=' h-14 z-0 w-1/4' />
                                                <p className='px-4 w-3/4'>{item.name}</p>
                                            </div>))
                                    }
                                    <div className="flex justify-between items-center mt-3 gap-5 w-full">

                                        {
                                            isLoggedIn ? (
                                                <PrimaryButton onClick={() => addCombo(item.id)} class="inline-block font-semibold rounded-md border-0 bg-[#ff8415]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20" >
                                                    Add+
                                                </PrimaryButton>
                                            ) : (
                                                <button
                                                    className="inline-block mt-0 text-black font-semibold rounded-md border-0 bg-[#ff8415]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20"
                                                    onClick={() => {
                                                        setIsVisible(false);
                                                        router.push("/register/");
                                                    }}
                                                >
                                                    Login to Add
                                                </button>
                                            )
                                        }



                                        <div className="flex flex-col">
                                            <p className="text-xs font-medium line-through">₹{item.total_price}</p>
                                            <p className="text-sm font-semibold text-md">₹{item.discounted_price}</p>
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
            </div>
        </div>
    )
}

export default EventDetails