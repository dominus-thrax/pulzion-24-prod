import React from "react";
import Lottie from 'react-lottie';
import data from "../lotties/loader.json";
// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: data,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-primaries-700">
      <Lottie options={defaultOptions} height={400} width={400}></Lottie>
    </div>
  );
};

export default Loader;
