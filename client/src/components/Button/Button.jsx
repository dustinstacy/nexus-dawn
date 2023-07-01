import React from 'react'
import { useNavigate } from 'react-router-dom'

import { classSet } from '@utils'

import './Button.scss'

// Renders button component that can function as a navigation link or a custom onClick function.
// Set the prop 'type' to 'link' and provide a 'path' to navigate to a specific page.
// Set the prop 'onClick' to define a custom function to execute on button click.
const Button = ({ label, type, path, onClick, disabled }) => {
    const navigate = useNavigate()

    const handleClick = (e) => {
        type === 'link' ? navigate(`${path}`) : onClick(e)
    }

    const buttonClasses = classSet('button', 'center', disabled && 'disabled')

    return (
        <button className={buttonClasses} onClick={(e) => handleClick(e)}>
            <span>{label}</span>
        </button>
    )
}

export default Button
