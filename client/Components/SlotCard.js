import React from 'react'
import { IoAlarmOutline, IoAlarmSharp, IoCalendarSharp } from 'react-icons/io5';
import { displayDate, displayFormat } from '../utils/displayTime';
import ToolTipButton from './Button/ToolTipButton';

const SlotCard = ({ slot, handleBook }) => {
    return (
        <>
            <div className='flex flex-col gap-4 py-4'>
                <div className='flex items-center justify-between gap-2'>
                    <p className='flex items-center gap-2 text-xl font-bold tracking-wide text-white'>
                        <IoCalendarSharp />
                        <span>{displayDate(slot.start_time)}</span>
                    </p>
                    <p className='flex items-center gap-2 text-xl font-bold tracking-wide text-white'>
                        <IoAlarmSharp /> <span>{displayFormat(slot.start_time)} - {displayFormat(slot.end_time)}</span>
                    </p>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <p className='text-xl font-bold tracking-wide text-white'>
                        capacity: {slot.capacity}
                    </p>
                    <ToolTipButton loader={false} text="Book Now" handleConfirm={()=>handleBook(slot.id)}/>
                </div>
            </div>
            <div className='w-full h-px bg-white opacity-10'></div>
        </>
    )
}

export default SlotCard