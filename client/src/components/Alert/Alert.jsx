import React from 'react'
import { ModalOverlay } from '@components'

import './Alert.scss'

// Component that alerts the user to an unfinished battle and provides options to continue or forfeit.
const Alert = ({ children }) => {
    return (
        <ModalOverlay>
            <div className='alert box center-column'>
                <h1>⚠️</h1>
                {children}
            </div>
        </ModalOverlay>
    )
}

export default Alert
