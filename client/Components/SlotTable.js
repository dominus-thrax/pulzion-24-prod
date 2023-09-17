import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { addSlots, deleteSlot } from '../action/slots';
import PrimaryButton from './Button/PrimaryButton';
import SlotForm from './SlotForm';
import SlotRow from './SlotRow'

const SlotTable = ({ slots, setSlots, event_id }) => {
  const [newSlot, setNew] = useState(false);
  const handleCreate = async (values) => {
    try {
      const data = await addSlots(values, event_id);
      if(data?.error) {
        toast.error(data.error)
        return;
      }
      setSlots([
        ...slots,
        data.slot
      ])
      setNew(false)
    } catch(e) {
      
      toast.error('Something Went Wrong')
    }
  }
  const handleDelete = async (id) => {
    try {
      const data = await deleteSlot(id);
      if(data?.error) {
        toast.error(data.error)
        return;
      }
      setSlots(slots.filter((item)=>item.id !== id));
    } catch(e) {
      
      toast.error('Something Went Wrong')
    }
  }
  return (
    <>
      <div className='w-full overflow-x-auto mt-5 bg-primaries-800 text-primaries-100 px-4 py-4'>
        <div className='flex mb-5'>
          <PrimaryButton onClick={() => setNew(true)}>Add Slot</PrimaryButton>
        </div>
        <table className='min-w-full border-gray-900 border-2'>
          <tr>
            <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
              id
            </th>
            <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
              Start Time
            </th>
            <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
              End Time
            </th>
            <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
              Capacity
            </th>
            <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
              Year
            </th>
            <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
              Actions
            </th>
          </tr>
          {
            !slots || slots?.length === 0 && <tr>
              <td className='px-2 py-2 text-center text-xl border-gray-900 border-2' colSpan={6}>
                No Available Slots
              </td>
            </tr>
          }
          {
            slots?.length > 0 && slots.map((slot) => (
              <SlotRow slot={slot} handleDelete={handleDelete} />
            ))
          }
        </table>
      </div>
      {newSlot && <SlotForm setOpen={setNew} handleSubmit={handleCreate} />}
    </>
  )
}

export default SlotTable