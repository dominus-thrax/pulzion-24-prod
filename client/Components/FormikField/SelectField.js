import React from 'react'
import Select from 'react-select'
import { useFormikContext } from 'formik';

const SelectField = ({ label, name, placeholder, options, ...otherProps }) => {
	const { errors, touched, values, setValues } = useFormikContext()
  const handleSingleChange = (selectedOption) => {
    setValues({ ...values, [name]: selectedOption});
  };
  return (
    <div className="flex flex-col gap-2">
			{label && <label className='text-primaries-100'>{label}</label>}
      <Select 
        value={values[name]}
        options={options}
        onChange={handleSingleChange}
        name={name}
        placeholder={placeholder}
        {...otherProps}
      />
			{errors[name] && touched[name] && <p className='text-red-500'>{errors[name]?.value}</p>}
    </div>
  )
}

export default SelectField