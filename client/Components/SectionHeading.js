import React from 'react'

const SectionHeading = ({ children }) => {
	return (
		<h1
			className={`text-[#ffffff] primary_font font-mdeium my-10 tracking-widest  uppercase  text-center text-3xl sm:text-4xl md:text-7xl `}

		>
			{children}
		</h1>
	)
}

export default SectionHeading