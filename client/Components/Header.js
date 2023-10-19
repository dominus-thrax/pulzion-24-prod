import React, { useContext, useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import styles from "../styles/header.module.css";
import PrimaryButton from "./Button/PrimaryButton";
import Link from "next/link";
import AppContext from "../context/AppContext";
import { IoChevronDown } from "react-icons/io5";
import { useRouter } from "next/router";
import { logout } from "../action/user";
import { AiOutlineShoppingCart } from "react-icons/ai";

let links;

const Header = () => {
  const { user, dispatchUser, dispatchEvents } = useContext(AppContext);
  const router = useRouter();

  user?.id
    ? (links = [
      {
        id: 1,
        text: "Home",
        to: "/",
      },
      {
        id: 2,
        text: "Events",
        to: "/events",
      },
      {
        id: 3,
        text: "About",
        to: "/about",
      },
      {
        id: 4,
        text: "Sponsors",
        to: "/sponsors",
      },
      {
        id: 5,
        text: "Team",
        to: "/team",
      },
      {
        id: 6,
        text: "Glimpses",
        to: "/glimpses",
      },
      {
        id: 7,
        text: "Cart",
        to: "/cart",
      },
      {
        id: 8,
        text: "Orders",
        to: "/orders",
      },
      {
        id: 9,
        text: "My Events",
        to: "/my_events",
      },
    ])
    : (links = [
      {
        id: 1,
        text: "Home",
        to: "/",
      },
      {
        id: 2,
        text: "Events",
        to: "/events",
      },
      {
        id: 3,
        text: "About",
        to: "/about",
      },
      {
        id: 4,
        text: "Sponsors",
        to: "/sponsors",
      },
      {
        id: 5,
        text: "Team",
        to: "/team",
      },
      {
        id: 6,
        text: "Glimpses",
        to: "/glimpses",
      },
    ]);

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const data = await logout(dispatchUser, dispatchEvents);
      if (data?.error) {
      }
    } catch (e) { }
  };

  return (
    <div className="h-[10dvh] lg:h-[12dvh] z-50 absolute w-full flex" id="nav">
      <link
        href="https://use.fontawesome.com/releases/v5.0.1/css/all.css"
        rel="stylesheet"
      ></link>
      <div className="relative h-full w-full px-4 py-5 sm:px-8 prae">
        <div className="flex items-center justify-between gap-2">
          <div>
            <Link href="/">
              <img
                src="/navbar_logo.png"
                className="cursor-pointer min-h-[40px] lg:max-h-8 max-h-6"
              />
            </Link>
          </div>
          {/* <div className="w-8"></div> */}
          <div className="items-center hidden xl:ml-auto xl:flex lg-gap-1 nav-font">
            {links.map((link) => (
              <Link href={link.to} key={link.id.toString()}>
                <span
                  className={`text-2xl cursor-pointer  ease-in-out duration-300 px-5 py-1 text-center ${link.id > 6 ? "hidden" : ""
                    }  ${router.pathname === link.to
                      ? "text-[#ff8415] font-bold tracking-wider text-3.5xl"
                      : "text-white"
                    }`}
                >
                  {link.text}
                </span>
              </Link>
            ))}
          </div>
          {!user?.id ? (
            <div className="hidden xl:block">
              <PrimaryButton onClick={() => router.push("/register")}>
                Login
              </PrimaryButton>
            </div>
          ) : (
            <div className={`${styles.shower} relative hidden xl:block`}>
              <button className="flex items-center justify-between gap-3 px-4 py-2 text-xl border-2 shadow-md bg-orange-700 text-primaries-100 border-[rgba(255,255,255,0.5)] rounded-xl">
                <span>{user.first_name}</span>
                <span>
                  <IoChevronDown />
                </span>
              </button>
              <div
                className={`${styles.drop} hidden absolute bg-orange-700 text-primaries-100 w-40 flex-col px-4 text-lg rounded-md`}
                style={{
                  top: "100%",
                  zIndex: 40,
                }}
              >
                <Link href="/orders">
                  <div className="py-2 text-center cursor-pointer">Orders</div>
                </Link>
                <Link href="/my_events">
                  <div className="py-2 text-center cursor-pointer">
                    My Events
                  </div>
                </Link>
                <button className="w-full py-2" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
          {user?.id ? (
            <Link href={"/cart"} key={"7"}>
              <span
                className={`text-primaries-100 xl:block hidden text-xl cursor-pointer ease-in-out duration-300 px-5 py-1 border-2 rounded-full text-center border-transparent`}
              >
                <i className="">
                  <AiOutlineShoppingCart className="relative text-4xl text-white lg:text-5xl" />
                </i>
              </span>
            </Link>
          ) : (
            <></>
          )}
          <button
            className="block xl:hidden text-primaries-100"
            onClick={() => setOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div
          className={`block xl:hidden fixed min-h-screen top-0 left-0 bg-primaries-700 w-screen opacity-90 z-50 px-4 py-10 ${styles.mobile_nav}`}
        >
          <div>
            <div className="flex justify-end mb-8 text-primaries-100">
              <button onClick={() => setOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center gap-5">
              {links.map((link) => (
                <Link href={link.to} key={link.id.toString()}>
                  <span className="text-xl mobile_nav_link text-center duration-300 ease-in-out cursor-pointer text-primaries-100 hover:text-primaries-500">
                    {link.text}
                  </span>
                </Link>
              ))}
              <div>
                {!user?.id ? (
                  <PrimaryButton onClick={() => router.push("/register")}>
                    Login
                  </PrimaryButton>
                ) : (
                  <div className="flex flex-col gap-5 mt-5">
                    {/* <Link href="/my_events">
                      <span className="text-xl text-center duration-300 ease-in-out cursor-pointer text-primaries-100 hover:text-primaries-500">
                        My Events
                      </span>
                    </Link> */}
                    <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;