import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { logout } from "../action/user";

const links = [
  {
    id: 1,
    to: "/admin/dashboard",
    text: "Dashboard",
  },
  {
    id: 2,
    to: "/admin/events",
    text: "Events",
  },
  {
    id: 3,
    to: "/admin/combo",
    text: "Events Combo",
  },
  {
    id: 4,
    to: "/admin/registerations",
    text: "Registeration",
  },
  {
    id: 5,
    to: "/admin/register",
    text: "Register User",
  },
  {
    id: 6,
    to: "/admin/verify",
    text: "Verify Payment",
  },
  {
    id: 7,
    to: "/admin/mail",
    text: "Admin Mail",
  },
];

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const path = router.pathname;

  const { dispatchUser, dispatchEvents } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      const data = await logout(dispatchUser, dispatchEvents);
      if (data?.error) {

      }
    } catch (e) {

    }
  };

  return (
    <div className="flex bg-primaries-700">
      <div className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
        {/* <h2 className="text-3xl font-semibold text-center text-blue-800">Logo</h2> */}
        <img src="/navbar_logo.png" alt="logo" className="mb-5" />
        <div className="flex flex-col justify-between mt-6 flex-1">
          <aside>
            <ul>
              {links.map((link) => (
                <li key={link.id.toString()}>
                  <Link href={link.to}>
                    <span
                      className={`flex cursor-pointer items-center px-4 py-2 text-primaries-100 rounded-md ${path === link.to ? "bg-primaries-800" : ""
                        }`}
                    >
                      <span className="font-medium">{link.text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <button
          className="border-2 border-primaries-500 text-primaries-100 px-4 py-2 w-full text-center rounded-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="w-full p-4 overflow-y-auto h-screen">{children}</div>
    </div>
  );
};

export default AdminLayout;
