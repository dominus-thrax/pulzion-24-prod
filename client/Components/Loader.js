import React from "react";
import Lottie from "react-lottie";
import * as data from "../lotties/loader.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: data,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loader = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-primaries-700">
      <img
        srcSet="https://cdn.svgator.com/images/2021/10/solar-system-animation.svg 400w, 
			 https://cdn.svgator.com/images/2021/10/solar-system-animation.svg 800w,
			 https://cdn.svgator.com/images/2021/10/solar-system-animation.svg 1200w,
			 https://cdn.svgator.com/images/2021/10/solar-system-animation.svg 1600w"
        sizes="(max-width:480px) 350px, (max-width:1440px) 800px, 1200px"
        src="https://cdn.svgator.com/images/2021/10/solar-system-animation.svg"
        fetchpriority="”high”"
        alt="Animated Vectors Flying to the Moon and Back: About the Space Animation Trend"
      ></img>
      {/* <div
        className='w-11/12 max-w-5xl flex flex-col items-center justify-center'
      >
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div> */}
    </div>
  );
};

export default Loader;
