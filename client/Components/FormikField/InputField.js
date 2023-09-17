import React from 'react'
import { useFormikContext } from 'formik';

const InputField = ({ label, type, name, placeholder,value, ...otherProps }) => {
	const { errors, touched } = useFormikContext()
	return type !== 'checkbox' ? (
		<div className="flex flex-col gap-2">
			{label && <label className='text-primaries-100'>{label}</label>}
			<input
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				className="px-8 w-full border rounded px-3 py-2 text-primaries-100 focus:outline-none bg-primaries-800"
				{...otherProps}
			/>
			{errors[name] && touched[name] && <p className='text-red-500'>{errors[name]}</p>}
		</div>
	) : (
		<div className="flex flex-row gap-2 items-center">
			<input
				type={type}
				placeholder={placeholder}
				name={name}
				checked={value}
				className="text-primaries-700 focus:outline-none"
				{...otherProps}
			/>
			{label && <label className='text-primaries-100'>{label}</label>}
		</div>
	)
}

export default InputField