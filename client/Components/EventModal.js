import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  useContext,
} from "react";
import {
  event_modal_desc,
  modal_gradient_class,
} from "../styles/event_modal.module.css";
import { useRouter } from "next/router";
import ToolTipButton from "./Button/ToolTipButton";
import { IoGlobeSharp } from "react-icons/io5";
import EventAccordian from "./EventAccordian";
import ContentLoader from "./ContentLoader";
import SlotCard from "./SlotCard";
import { addItem } from "../action/cart";
import { toast } from "react-toastify";
import { userRegisterEvent } from "../action/registeration";
import AppContext from "../context/AppContext";

const EventModal = forwardRef(
  (
    {
      id,
      title,
      description,
      rules,
      rounds,
      teams,
      notes,
      isLoggedIn,
      alreadyRegistered,
      loading,
      mode,
      play,
      link,
      fetchSlots,
      slots,
      handleBook,
      registeredEvent,
      setSlots,
      price,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const { dispatchEvents } = useContext(AppContext);
    const handleAddToCart = async () => {
      try {
        setLoader(true);
        const data = await addItem(id);
        if (data?.error) {
          toast.error(data.error);
          setLoader(false);
          return;
        }
        setLoader(false);
        toast.success("Event added to cart");
      } catch (e) {
        
        setLoader(false);
        toast.error("Something went wrong");
      }
    };
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
    useImperativeHandle(
      ref,
      () => {
        return {
          toggle: () => {
            setIsVisible(!isVisible);
          },
        };
      },
      []
    );

    // const closedEvents = [2, 18, 7, 14, 15, 16, 6, 1, 9, 13, 8, 5];
    const closedEvents = [];

    const tabs = [
      {
        id: 1,
        text: "Rounds",
        content: rounds,
      },
      {
        id: 2,
        text: "Rules and Regulations",
        content: rules,
      },
      {
        id: 3,
        text: "Team Distribution",
        content: teams,
      },
      {
        id: 4,
        text: "Event Leads",
        content: notes,
      },
    ];

    const [active, setActive] = useState(-1);

    return (
      // <div className="p-[2rem] h-[100%] w-[100%]">
      <div
        style={{
          pointerEvents: "none",
          display: isVisible ? "block" : "none",
          display: isVisible ? "block" : "none",
          zIndex: "99",
        }}
        className="fixed top-0 left-0 w-[100%] min-h-[100%] backdrop-blur"
        >
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <div className="w-fit h-fit m-3" style={{
            backgroundColor:'linear-gradient(to top right,red,green)',
            margin:"15px auto 0px"
          }}>
        <div
          className="w-11/12 max-w-xl text-orange-700 rounded-3xl shadow-[0px_0px_15px_5px] event-modal"
          style={{
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%,-50%)",
            pointerEvents: "all",
            height: "90vh",
            marginLeft:'15px'
          }}
        >
          {loading && <ContentLoader />}
          <div
            className="flex flex-row items-center justify-between w-full px-5 py-6 shadow-lg md:px-8 event_modal_title rounded-t-3xl bg-black/[.6]"
            style={{
              height: "15%",
            }}
          >
            <div className="flex flex-col">
              <p className="text-xl font-bold md:text-3xl">{title}</p>
              <div className="flex items-center gap-2 test-base md:text-lg">
                <span className="text-green-500">
                  <IoGlobeSharp />{" "}
                </span>
                <p>
                  {mode}
                  {mode === "Blended"
                    ? " (Round 1: Online Round 2: Offline)"
                    : ""}
                </p>
                <p className="font-bold text-md md:text-xl">₹{price}</p>
              </div>
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                setSlots([]);
                setIsVisible(false);
                document.querySelector("body").style.overflowY = "auto";
              }}
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
              </svg>
            </div>
          </div>
          {slots?.length > 0 ? (
            <div
            className={`${event_modal_desc} overflow-y-auto text-justify px-4 md:px-8 py-5`}
            style={{ height: "70%" }}
            >
              <p className="mb-5 text-3xl font-bold text-white">
                Available Slots:
              </p>
              {slots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} handleBook={handleBook} />
                ))}
            </div>
          ) : (
            <div
            className={`${event_modal_desc} overflow-y-auto text-justify px-4 md:px-8 py-5 bg-black/[.4]`}
            style={{ height: "70%" }}
            >
              <div className="mb-5">
                {description.map((txt) => (
                  <p
                  className="text-lg font-normal text-left text-primaries-100 font"
                  key={txt}
                  >
                    {txt}
                  </p>
                ))}
              </div>
              <div className="border-collapse">
                {tabs.map((tab) => (
                  <EventAccordian
                  key={tab.id}
                  title={tab.text}
                  activeIndex={active}
                  setActiveIndex={setActive}
                  index={tab.id}
                  >
                    {tab.content.map((txt) => (
                      <p
                      className="text-lg font-normal text-primaries-100 font"
                      key={txt}
                      >
                        {txt}
                      </p>
                    ))}
                  </EventAccordian>
                ))}
              </div>
            </div>
          )}
          <div
            className="flex items-center justify-center py-5 shadow-lg rounded-b-3xl bg-black/[.7]"
            style={{
              height: "15%",
            }}
            >
            {!isLoggedIn ? (
              <button
                className="px-5 py-2 font-bold tracking-wider text-white uppercase duration-500 ease-in-out rounded-md bg-[hsl(21,90%,28%)] hover:bg-[hsl(21,90%,48%)]"
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
                  {price > 0 ? (
                    <ToolTipButton
                      loader={loader}
                      text={
                        closedEvents.includes(id)
                          ? "Event Closed"
                          : `Add to Cart`
                      }
                      handleConfirm={
                        closedEvents.includes(id)
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
                      loader={loader}
                      text={`Register`}
                      handleConfirm={handleRegister}
                    />
                  )}
                </span>
              )
            )}
            {isLoggedIn && alreadyRegistered && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {!registeredEvent?.fk_slot && (
                  <button
                    className="px-5 py-2 tracking-wider text-white uppercase duration-500 ease-in-out rounded-md bg-orange-500 hover:bg-orange-700"
                    onClick={
                      slots?.length > 0 ? () => setSlots([]) : fetchSlots
                    }
                  >
                    {slots?.length > 0 ? "Cancel" : "Book Slot"}
                  </button>
                )}
                {play && (
                  <a
                    className="px-5 py-2 tracking-wider text-white uppercase duration-500 ease-in-out rounded-md bg-orange-500 hover:bg-orange-700"
                    href={id===1 ? "https://www.codechef.com/CDLS2023" : link}
                    target="_blank"
                  >
                    Play
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
      // </div>
    );
  }
);

export default EventModal;
