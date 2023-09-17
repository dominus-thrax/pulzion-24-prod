import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-3 text-base bg-transparent relative">
      <div className="flex items-center justify-between gap-5">
        <p className="text-primaries-100 text-center">
          &copy; PICT ACM Student Chapter
        </p>
        <p className="text-primaries-100 text-center hidden md:block text-center">
          Designed & Developed by PASC Web Team
        </p>
        <Link href="/privacy_policy">
          <span className="text-blue-500 cursor-pointer">Privacy Policy</span>
        </Link>
      </div>
      <p className="text-primaries-100 text-center block md:hidden mt-5 text-center">
        Designed & Developed by PASC Web Team
      </p>
    </div>
  );
};

export default Footer;
