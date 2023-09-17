import React, { useState } from 'react'
import { IoTrashSharp } from 'react-icons/io5'
import displayTime from '../utils/displayTime';
import ConfirmationModal from './ConfirmationModal';


const SlotRow = ({ slot, handleDelete }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <tr>
      <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
        {slot.id}
      </td>
      <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
        {displayTime(slot.start_time)}
      </td>
      <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
        {displayTime(slot.end_time)}
      </td>
      <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
        {slot.capacity}
      </td>
      <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
        {slot.year}
      </td>
      <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
        <span className='flex gap-2 justify-center'>
          <button onClick={()=>setOpen(true)}>
            <IoTrashSharp />
          </button>
        </span>
      </td>
    </tr>
    {
      open && (
        <ConfirmationModal 
          handleConfirm={()=>{
            handleDelete(slot.id)
            setOpen(false)
          }}
          handleCancel={()=>setOpen(false)}
          text='Are you sure?'
        />
      )
    }
    </>
  )
}

export default SlotRow