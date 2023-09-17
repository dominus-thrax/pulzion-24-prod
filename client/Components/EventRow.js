import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { IoEyeSharp, IoTrashSharp } from 'react-icons/io5'
import { toast } from 'react-toastify';
import { deleteEvent } from '../action/events';
import AppContext from '../context/AppContext';
import ConfirmationModal from './ConfirmationModal';

const EventRow = ({ event }) => {

  const [open, setOpen] = useState(false);

  const { dispatchEvents } = useContext(AppContext)

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const data = await deleteEvent(event.id, dispatchEvents);
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setOpen(false);
    } catch (e) {
      
      toast.error('Something Went Wrong');
    }
  }

  return (
    <>
      <tr>
        <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
          {event.id}
        </td>
        <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
          {event.name}
        </td>
        <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
          {event.type}
        </td>
        <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
          {event.is_active ? "Active" : "Inactive"}
        </td>
        <td className='px-2 py-2 text-center text-lg border-gray-900 border-2'>
          <span className='flex gap-2 justify-center'>
            <button onClick={() => router.push(`/admin/event/${event.id}`)}>
              <IoEyeSharp />
            </button>
            <button onClick={()=>setOpen(true)}>
              <IoTrashSharp />
            </button>
          </span>
        </td>
      </tr>
      {
        open && 
        (
          <ConfirmationModal
            text='Are You Sure?'
            handleCancel={()=>setOpen(false)}
            handleConfirm={handleDelete}
          />
        )
      }
    </>
  );
}

export default EventRow