import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { updateEvent } from '../../../action/events';
import { getAdminSlots } from '../../../action/slots';
import AdminLayout from '../../../Components/AdminLayout';
import EventFormModal from '../../../Components/EventFormModal';
import SlotTable from '../../../Components/SlotTable';
import AppContext from '../../../context/AppContext';
import privateAdminRoute from '../../../routes/privateAdminRoute';
import seperateLine from '../../../utils/seperateLines';

const Event = () => {
  const router = useRouter();
  const { contEvents, dispatchEvents } = useContext(AppContext);
  const [edit, setEdit] = useState(false)
  const [slots, setSlots] = useState([]); 
  let { id } = router.query;
  id = parseInt(id);
  const event = contEvents?.find((item) => item.id === id);
  const description = seperateLine(event?.description ? event.description : '');
  const rules = seperateLine(event?.rules ? event.rules : '');
  const rounds = seperateLine(event?.rounds ? event.rounds : '');
  const teams = seperateLine(event?.teams ? event.teams : '');
  const notes = seperateLine(event?.notes ? event.notes : '');

  useEffect(()=>{
    const fetchSlots = async () => {
      try {
        const data = await getAdminSlots(id);
        if(data?.error) {
          
          return;
        }
        setSlots(data.slots);
      } catch(e) {
        
      }
    }
    fetchSlots();
  }, [setSlots, id])

  const handleUpdate = async (values) => {
    try {
      const data = await updateEvent(id, values, dispatchEvents);
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setEdit(false);
    } catch (e) {
      
      toast.error('Something Went Wrong');
    }
  }

  return event?.id ? (
    <AdminLayout>
      <Head>
        <title>Pulzion'23 | Admin</title>
      </Head>
      <div>
        {edit && <EventFormModal event={event} setOpen={setEdit} handleSubmit={handleUpdate} />}
        <div className='flex gap-8'>
          <div className='bg-primaries-800 px-2 py-2 rounded-xl'
            style={{ width: '200px', minHeight: '200px' }}
          >
            <img src={event.logo} alt='logo' className='w-full' />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-primaries-100 text-5xl font-bold'>{event.name}</p>
            <p className='text-primaries-100 text-xl font-normal'>{event.type}</p>
            <div>
              <p className='text-primaries-100 text-xl font-bold'>Tagline:</p>
              <p className='text-primaries-100 text-xl font-normal'>{event.tagline}</p>
            </div>
            <div>
              <p className='text-primaries-100 text-xl font-bold'>Price: {event.price}</p>
            </div>
            <div>
              <button
                className='border-2 border-primaries-500 text-primaries-100 px-4 py-2 text-center rounded-xl'
                onClick={() => setEdit(true)}
              >
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5 mt-5'>
          <div className='flex flex-col gap-2'>
            <p className='text-primaries-100 text-2xl font-bold'>Description:</p>
            {description.map((item) => (
              <p className='text-primaries-100 text-xl font-normal' key={item}>{item}</p>
            ))}
          </div>
          {
            event.rules && rules.length > 0 &&
            (
              <div className='flex flex-col gap-2'>
                <p className='text-primaries-100 text-2xl font-bold'>Rules:</p>
                {rules.map((item) => (
                  <p className='text-primaries-100 text-xl font-normal' key={item}>{item}</p>
                ))}
              </div>
            )
          }
          {
            event.rounds && rounds.length > 0 &&
            (
              <div className='flex flex-col gap-2'>
                <p className='text-primaries-100 text-2xl font-bold'>Rounds:</p>
                {rounds.map((item) => (
                  <p className='text-primaries-100 text-xl font-normal' key={item}>{item}</p>
                ))}
              </div>
            )
          }
          {
            event.teams && teams.length > 0 &&
            (
              <div className='flex flex-col gap-2'>
                <p className='text-primaries-100 text-2xl font-bold'>Team Distribution:</p>
                {teams.map((item) => (
                  <p className='text-primaries-100 text-xl font-normal' key={item}>{item}</p>
                ))}
              </div>
            )
          }
          {
            event.notes && notes.length > 0 &&
            (
              <div className='flex flex-col gap-2'>
                <p className='text-primaries-100 text-2xl font-bold'>Note:</p>
                {notes.map((item) => (
                  <p className='text-primaries-100 text-xl font-normal' key={item}>{item}</p>
                ))}
              </div>
            )
          }
        </div>
        <div>
          <SlotTable slots={slots} setSlots={setSlots} event_id={id} />
        </div>
      </div>
    </AdminLayout>
  ) : (
    <></>
  );
}

export default privateAdminRoute(Event);