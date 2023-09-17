import React, { useState } from 'react'
import ConfirmationTooltip from '../ConfirmationTooltip'

const ToolTipButton = ({loader, handleConfirm, text }) => {
  const [visible, setVisible] = useState(false);
  return (
    // <ConfirmationTooltip
    //   handleConfirm={handleConfirm}
    //   handleCancel={() => setVisible(false)}
    //   visible={visible}
    // >
      <button
        className="px-5 py-2 tracking-wider text-white uppercase duration-500 ease-in-out rounded-md bg-primaries-800 hover:bg-primaries-500"
        onClick={handleConfirm}
        id='cart_button'
      >
      {text} {loader && <i class="fa fa-spinner fa-spin"></i>} 
      </button>
    // </ConfirmationTooltip>
  )
}

export default ToolTipButton