import React, { useContext, useState } from 'react'
import Head from 'next/head';
import { toast } from 'react-toastify';
import { createEvent } from '../../action/events';
import AdminLayout from '../../Components/AdminLayout'
import PrimaryButton from '../../Components/Button/PrimaryButton'
import EventFormModal from '../../Components/EventFormModal';
import EventTable from '../../Components/EventTable';
import AppContext from '../../context/AppContext';
import privateAdminRoute from '../../routes/privateAdminRoute';

const Events = () => {
  const [newEvent, setNew] = useState(false);
  const { dispatchEvents, contEvents } = useContext(AppContext)
  const handleCreate = async (values) => {
    try {
      const data = await createEvent(values, dispatchEvents);
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setNew(false);
    } catch (e) {
      
      toast.error('Something Went Wrong');
    }
  }
  return (
    <AdminLayout>
      <Head>
        <title>Pulzion'23 | Admin</title>
      </Head>
      <>
        <div>
          <div className='flex justify-end '>
            <PrimaryButton
              onClick={() => setNew(true)}
            >
              Create
            </PrimaryButton>
          </div>
        </div>
        <EventTable contEvents={contEvents} />
        {
          newEvent && (
            <EventFormModal setOpen={setNew} handleSubmit={handleCreate} />
          )
        }
      </>
    </AdminLayout>
  )
}

export default privateAdminRoute(Events);