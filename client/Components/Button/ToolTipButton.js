import React, { useState } from 'react'
import ConfirmationTooltip from '../ConfirmationTooltip'

const ToolTipButton = ({ loader, handleConfirm, text }) => {
  const [visible, setVisible] = useState(false);
  return (
    // <ConfirmationTooltip
    //   handleConfirm={handleConfirm}
    //   handleCancel={() => setVisible(false)}
    //   visible={visible}
    // >
    <button
      className="inline-block text-black mt-4 font-semibold rounded-md border-0 bg-[#ff8415]  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20"
      onClick={handleConfirm}
      id='cart_button'
    >
      {text} {loader && <i class="fa fa-spinner fa-spin"></i>}
    </button>
    // </ConfirmationTooltip>
  )
}

export default ToolTipButton