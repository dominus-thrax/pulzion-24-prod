import React from 'react';

const PrimaryButton = ({ children, handleClick, ...otherProps }) => {
  return (
    <button
      className="px-8 py-2 bg-[#ff8415] shadow-md hover:scale-105 ease-in-out text-inconsolata text-[#840025] font-semibold"
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