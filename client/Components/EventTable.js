import React from 'react'
import EventRow from './EventRow';

const EventTable = ({ contEvents }) => {
  return (
    <div className='w-full overflow-x-auto mt-5 bg-primaries-800 text-primaries-100 px-4 py-4'>
      <table className='min-w-full border-gray-900 border-2'>
        <tr>
          <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
            id
          </th>
          <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
            Event Name
          </th>
          <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
            Event Type
          </th>
          <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
            Event Status
          </th>
          <th className='px-2 py-2 text-center text-xl border-gray-900 border-2'>
            Actions
          </th>
        </tr>
        {
          contEvents?.map((event) => (
            <EventRow event={event} key={event.id.toString()} />
          ))
        }
      </table>
    </div>
  )
}

export default EventTable