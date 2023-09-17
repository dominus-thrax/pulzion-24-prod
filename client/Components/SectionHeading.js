import React from 'react'

const SectionHeading = ({ children }) => {
	return (
		<h1
			className={`uppercase text-center text-3xl sm:text-4xl md:text-5xl font-black text-sky-400 aerospace_font`}
		>
			{children}
		</h1>
	)
}

export default SectionHeading