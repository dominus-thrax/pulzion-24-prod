import { Formik } from 'formik'
import * as Yup from "yup";
import React from 'react'
import InputField from './FormikField/InputField';
import SelectField from './FormikField/SelectField'
import PrimaryButton from './Button/PrimaryButton';
import * as styles from '../styles/admin.module.css';
import AppText from './FormikField/AppText';

const types = [
  { label: 'Technical', value: 'Technical' },
  { label: 'Non Technical', value: 'Non Technical' }
]

const modes = [
  { label: 'Online', value: 'Online' },
  { label: 'Offline', value: 'Offline' },
  { label: 'Blended', value: 'Blended' },
]

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required()
    .label("Name"),
  price: Yup.number().required().label("Price"),
  tagline: Yup.string()
    .trim()
    .required()
    .label("Tagline"),
  logo: Yup.string()
    .trim()
    .required()
    .label("Logo"),
  description: Yup.string()
    .trim()
    .required()
    .label("Description"),
  rules: Yup.string()
    .trim()
    .required()
    .label("Rules"),
  rounds: Yup.string()
    .trim()
    .required()
    .label("Rounds"),
  teams: Yup.string()
    .trim()
    .required()
    .label("Team Distribution"),
  notes: Yup.string()
    .trim()
    .required()
    .label("Team Lead"),
  type: Yup.object().shape({
    label: Yup.string().trim().required(),
    value: Yup.string().trim().required(),
  }).nullable().required().label('Event Type'),
  mode: Yup.object().shape({
    label: Yup.string().trim().required(),
    value: Yup.string().trim().required(),
  }).nullable().required().label('Event Mode'),
});

const EventFormModal = ({ setOpen, handleSubmit, event }) => {
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
            name: event?.name ? event.name : '',
            price: event?.price ? event.price : 0,
            tagline: event?.tagline ? event.tagline : '',
            description: event?.description ? event.description : '',
            type: event?.type ? { label: event.type, value: event.type } : {},
            mode: event?.mode ? { label: event.mode, value: event.mode } : {},
            logo: event?.logo ? event.logo : '',
            is_active: !!event?.is_active,
            play: !!event?.play,
            rules: event?.rules ? event.rules : '',
            rounds: event?.rounds ? event.rounds : '',
            teams: event?.teams ? event.teams : '',
            notes: event?.notes ? event.notes : '',
            link: event?.link ? event.link : '',
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
                className='grid md:grid-cols-2 gap-5'
              >
                <InputField
                  type='text'
                  name='name'
                  value={values.name}
                  placeholder='Event Name'
                  label='Event Name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  type='text'
                  name='tagline'
                  value={values.tagline}
                  placeholder='Event Tagline'
                  label='Event Tagline'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  type='text'
                  name='logo'
                  value={values.logo}
                  placeholder='Logo URL'
                  label='Logo'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  type='text'
                  name='link'
                  value={values.link}
                  placeholder='Platform Url'
                  label='Platform Url'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <SelectField
                  name='type'
                  label='Event Type'
                  placeholder='Event Type'
                  value={values.type}
                  onBlur={handleBlur}
                  options={types}
                />
                <SelectField
                  name='mode'
                  label='Event Mode'
                  placeholder='Event Mode'
                  value={values.mode}
                  onBlur={handleBlur}
                  options={modes}
                />
              </div>
              <div className='flex flex-col gap-5 my-5'>
                <InputField
                  type='number'
                  name='price'
                  value={values.price}
                  placeholder='Price'
                  label='Price'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <AppText
                  name='description'
                  value={values.description}
                  placeholder='Description'
                  label='Description'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <AppText
                  name='rules'
                  value={values.rules}
                  placeholder='Rules'
                  label='Rules'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <AppText
                  name='rounds'
                  value={values.rounds}
                  placeholder='Rounds'
                  label='Rounds'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <AppText
                  name='teams'
                  value={values.teams}
                  placeholder='Team Distribution'
                  label='Team Distribution'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <AppText
                  name='notes'
                  value={values.notes}
                  placeholder='Team Leads'
                  label='Team Leads'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className='flex justify-between items-center mt-5'>
                <div className='flex flex-col'>
                  <InputField
                    type='checkbox'
                    name='is_active'
                    value={values.is_active}
                    placeholder='Active?'
                    label='Active?'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <InputField
                    type='checkbox'
                    name='play'
                    value={values.play}
                    placeholder='Play?'
                    label='Play?'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <PrimaryButton type='submit'>
                    Create
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

export default EventFormModal