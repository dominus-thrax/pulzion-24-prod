import { useRouter } from "next/router";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const StriverModal = ({ isVisible, setIsVisible }) => {
  const router = useRouter();
  const onApp = router.pathname === '/sponsors/app' || router.pathname === '/privacy_policy/app'
  
  return (
    <div
      style={{
        zIndex: "99999",
        display: isVisible && !onApp ? "block" : "none",
      }}
      className="fixed top-0 left-0 w-screen min-h-screen backdrop-blur"
      onClick={() => {
        setIsVisible(false);
      }}
    >
      <IoCloseSharp
        style={{
          top: 10,
          right: 20,
          position: "absolute",
          width: "30px",
          height: "30px",
        }}
        color="#fff"
        onClick={() => setIsVisible(false)}
      />
      <div
        className="fixed flex flex-col items-center justify-center w-11/12 max-w-xl mb-5 text-white bg-transparent rounded-3xl"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "all",
          backgroundColor: "transparent",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img class="object-cover" src={"guest_speaker.png"} />
        <div className="flex flex-col items-center justify-center mt-5 rounded-b-3xl">
          <a
            href="https://arsh.pulzion.co.in"
            className="px-5 py-2 mb-3 tracking-wider text-white uppercase duration-500 ease-in-out rounded-md bg-primaries-500"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default StriverModal;
