import React from 'react'
import { useFormikContext } from 'formik';

const AppText = ({ label, name, placeholder, ...otherProps }) => {
  const { errors, touched } = useFormikContext()

  return (
    <div className="flex flex-col gap-2">
      {label && <label className='text-primaries-100'>{label}</label>}
      <textarea
        placeholder={placeholder}
        name={name}
        className="px-8 w-full border rounded px-3 py-2 text-primaries-100 focus:outline-none bg-primaries-800"
        {...otherProps}
      ></textarea>
      {errors[name] && touched[name] && <p className='text-red-500'>{errors[name]}</p>}
    </div>
  )
}

export default AppText