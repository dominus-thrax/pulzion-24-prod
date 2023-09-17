import React from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import * as styles from '../styles/admin.module.css';
import PrimaryButton from './Button/PrimaryButton';
import InputField from './FormikField/InputField';

const validationSchema = Yup.object().shape({
  start_time: Yup.string()
    .trim()
    .required()
    .label("Start Time"),
  end_time: Yup.string()
    .trim()
    .required()
    .label("End Time"),
  year: Yup.string()
    .trim()
    .required()
    .label("Year"),
  capacity: Yup.number().required('Capacity')
});

const SlotForm = ({ setOpen, handleSubmit, slot }) => {
  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center'
    >
      <div
        className={`${styles.scroll_element} max-w-5xl bg-primaries-800 w-11/12 mx-auto overflow-y-auto px-4 py-8 rounded-xl shadow-md`}
        style={{
          height: '70vh'
        }}
      >
        <div className='flex justify-end'>
          <button className='mb-5 text-primaries-100' onClick={() => setOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <Formik
          initialValues={{
            start_time: slot?.start_time ? slot.start_time : '',
            end_time: slot?.end_time ? slot.end_time : '',
            capacity: slot?.capacity ? slot.capacity : '',
            year: slot?.year ? slot.year : '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
            >
              <div
                className='grid md:grid-cols-1 gap-5'
              >
                <InputField
                  type='text'
                  name='capacity'
                  value={values.capacity}
                  placeholder='Slot Capacity'
                  label='Slot Capacity'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  type='datetime-local'
                  name='start_time'
                  value={values.start_time}
                  placeholder='Slot Start Time'
                  label='Slot Start Time'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  type='datetime-local'
                  name='end_time'
                  value={values.end_time}
                  placeholder='Slot End Time'
                  label='Slot End Time'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  type='text'
                  name='year'
                  value={values.year}
                  placeholder='Years (FE SE TE)'
                  label='Year'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div>
                  <PrimaryButton type='submit'>
                    Save
                  </PrimaryButton>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SlotForm