import React from 'react';

import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

const EventAccordian = ({ title, children, index, activeIndex, setActiveIndex }) => {
  const handleSetIndex = (index) => (activeIndex !== index) ? setActiveIndex(index) : setActiveIndex(-1);

  return (
    <div className="w-full mb-4">
      <button className='flex items-center gap-4 w-full text-primaries-100 text-xl font-bold hover:text-blue-500' onClick={() => handleSetIndex(index)}>
        <div className="flex items-center">
          <IoChevronDown className={`${activeIndex === index ? "rotate-180" : ""} ease-in-out duration-300`} />
        </div>
        <div className='flex iems-center'>
          <p className='font-bold'>{title}</p>
        </div>
      </button>

      {/* {(activeIndex === index) && ( */}
        <div className={`py-2 pl-4 text-left text-sm ease-in-out duration-300 ${activeIndex === index ? "block" : "hidden"}`}>
          {children}
        </div>
      {/* )} */}
    </div>
  );
};

export default EventAccordian;