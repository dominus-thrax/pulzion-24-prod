import React from 'react'
import * as styles from '../styles/admin.module.css';

const ConfirmationModal = ({text, handleCancel, handleConfirm}) => {
	return (
		<div
			className='w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center z-50'
		>
			<div
        className={`${styles.scroll_element} max-w-2xl bg-primaries-800 w-11/12 mx-auto overflow-y-auto px-4 py-4 rounded-xl shadow-md`}
			>
				<p className='text-primaries-100 font-bold text-3xl'>{text}</p>
				<div className='flex items-center justify-end mt-5 gap-3'>
						<button className='bg-primaries-500 text-primaries-100 px-4 w-20 py-2 rounded-xl' onClick={handleConfirm}>Yes</button>
						<button className='border-primaries-500 border-2 text-primaries-100 w-20 px-4 py-2 rounded-xl' onClick={handleCancel}>No</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmationModal