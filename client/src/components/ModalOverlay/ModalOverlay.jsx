import React from 'react'

import './ModalOverlay.scss'

// Screen overlay to disable and blur all elements behind Modal/Alert
// children: The desired Modal/Alert to be rendered
const ModalOverlay = ({ children }) => {
    return <div className='modal fill center-column'>{children}</div>
}

export default ModalOverlay
