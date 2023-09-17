import React from 'react';

const PrimaryButton = ({ children, handleClick, ...otherProps }) => {
  return (
    <button 
      className='px-8 py-2 bg-primaries-500 text-white shadow-md hover:scale-105 ease-in-out'
      style={{
        borderRadius: '30px',
      }}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default PrimaryButton