import React from 'react'

const SectionHeading = ({ children }) => {
	return (
		<h1
			className={`my-10 uppercase merienda_font text-center text-3xl sm:text-4xl md:text-5xl font-extralight text-slate-300`}
			style={{
				fontFamily: 'Merienda Medium, cursive',
			}}
		>
			{children}
		</h1>
	)
}

export default SectionHeading