import React from "react";
import Lottie from "react-lottie";
import * as data from "../lotties/final.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: data,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ContentLoader = () => {
  return (
    <div className="h-full w-full absolute flex items-center justify-center top-0 left-0 bg-primaries-700 opacity-90">
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
    </div>
  );
};

export default ContentLoader;
