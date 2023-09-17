import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { toast } from "react-toastify";
import { registerEvent } from "../action/registeration";
import { bookSlot, getSlots } from "../action/slots";
import AppContext from "../context/AppContext";
import { displayDate, displayFormat } from "../utils/displayTime";
import seperateLine from "../utils/seperateLines";
import EventModal from "./EventModal";
import cartReducer from "../reducers/cartReducer";
import { cartEvent } from "../reducers/cartReducer";
import { addToCart } from "../action/cart";
import { useCartContext } from "../context/CartContext.js";
import { useRouter } from 'next/router'
import { GrView } from "react-icons/gr"

function EventCard(props) {
  const modalRef = useRef();
  const { contEvents, user, dispatchEvents } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const description = seperateLine(props.description);
  const rules = seperateLine(props.rules ? props.rules : "");
  const rounds = seperateLine(props.rounds ? props.rounds : "");
  const teams = seperateLine(props.teams ? props.teams : "");
  const notes = seperateLine(props.notes ? props.notes : "");
  const isLoggedIn = !!user?.id;
  
  const [slots, setSlots] = useState([]);
  const alreadyRegistered = isLoggedIn
    ? !!contEvents.find((item) => item.id === props.id)?.id
      ? true
      : false
    : false;
  const registeredEvent = alreadyRegistered
    ? contEvents.find((item) => item.id === props.id)
    : undefined;
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      document.querySelector("body").style.overflowY = "auto"
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  const { addToCart } = useCartContext();
  const handleOpen = () => {
    document.querySelector("body").style.overflowY = "hidden"
    modalRef?.current?.toggle()
  }
  const fetchSlots = async () => {
    try {
      setLoading(true);
      const data = await getSlots(props.id);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      }
      if (data?.slots?.length > 0) {
        setSlots(data?.slots);
      } else {
        toast.error("Slot booking isn't active for this event!");
      }
    } catch (e) {
      
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`animated z-[2] top-24 w-[170px] sm:w-[210px] sm:h-[210px] h-[170px]`}>
        <img src={props.logo} alt={props.name} className="event-logo"
          style={{
            padding: "30px"
          }}
        />{" "}
      </div>
      <div className="w-full">
        <div className="xl:w-[100%] -z-0 sm:w-full cards h-[350px] xl:h-[400px] py-5 bg-gradient-to-br from-[#172947c5] to-black"
        >
          <div className="p-10 w-[100%] h-[350px] xl:h-[400px] gap-4 -top-5 flex flex-col justify-center items-center">
              <h2 className="mt-20 text-xl font-bold tracking-wider text-center text-white uppercase">{props.name}</h2>
              <h3 className="text-lg font-medium tracking-wider text-center text-white">{props.tagline}</h3>
              {registeredEvent?.fk_slot && (
                <h3 className="mt-2 text-center">
                  {displayDate(registeredEvent.start_time)}{" "}
                  {displayFormat(registeredEvent.start_time)} -{" "}
                  {displayFormat(registeredEvent.end_time)}
                </h3>
              )}
              <button
                className="relative mt-auto mb-3 py-2 px-6 text-black no-underline bg-[#03d3f0] hover:font-bold text-center rounded-full uppercase tracking-wide"
                onClick={handleOpen}
              >
                View
              </button>
          </div>
        </div>
      </div>      
      <EventModal        
        title={props.name}
        // title="Electroquest"
        play={props.play}
        description={description}
        rules={rules}
        rounds={rounds}
        teams={teams}
        notes={notes}
        ref={modalRef}
        isLoggedIn={isLoggedIn}
        alreadyRegistered={alreadyRegistered}
        mode={props.mode}
        id={props.id}
        loading={loading}
        link={props.link}
        price={props.price}
        fetchSlots={fetchSlots}
        slots={slots}
        handleBook={handleBook}
        registeredEvent={registeredEvent}
        setSlots={setSlots}
      />
    </div>
  );
}

export default EventCard;
