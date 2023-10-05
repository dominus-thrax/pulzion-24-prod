import React from 'react';

const PrimaryButton = ({ children, handleClick, ...otherProps }) => {
  return (
    <button
      className="inline-block text-black mt-4 font-semibold rounded-md border-0 bg-[#FF7518]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20"
      style={{
        borderRadius: "10px",
      }}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default PrimaryButton