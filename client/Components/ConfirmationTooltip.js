import React, { useState } from 'react'
import { tooltip, tooltiptext } from '../styles/tooltip.module.css'

const ConfirmationTooltip = ({ children, handleConfirm, handleCancel, visible }) => {
  return (
    <div className={tooltip}>
      {children}
      <div className={`${`${tooltiptext} ${visible ? 'visible opacity-100' : 'hidden opacity-0'}`} flex flex-col gap-2 items-center`}>
        <p className='text-primaries-100 font-bold text-base text-center'>Are You Sure?</p>
        <div className='flex gap-2'>
          <button className='bg-primaries-500 text-primaries-100 px-3 py-1 rounded-xl' onClick={handleConfirm}>Yes</button>
          <button className='border-primaries-500 border-2 text-primaries-100  px-3 py-1 rounded-xl' onClick={handleCancel}>No</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationTooltip