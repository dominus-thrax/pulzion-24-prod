import React from 'react'

const SectionHeading = ({ children }) => {
	return (
		<h1
			className={`text-[#ffffff] primary_font font-mdeium my-10 tracking-widest  uppercase  text-center text-5xl sm:text-6xl md:text-7xl `}

		>
			{children}
		</h1>
	)
}

export default SectionHeading