import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import { useToggle } from '@hooks'
import { classSet } from '@utils'

import './TextInput.scss'

// A reusable component that represents a text input field with optional password visibility toggle.
// label: The label text for the input field.
// name: The name attribute for the input field.
// value: The current value of the input field.
// onChange: The event handler function for the onChange event.
// loading: Indicates whether the input field is in a loading state.
// autofocus: Indicates whether the input field should be autofocused.
const TextInput = ({ label, name, value, onChange, loading, autofocus }) => {
    const [passwordVisible, togglePasswordVisible] = useToggle()
    const isPasswordInput = label.includes('Password')

    const inputType = isPasswordInput && !passwordVisible ? 'password' : 'text'
    const EyeIcon = passwordVisible ? AiFillEye : AiFillEyeInvisible
    const inputClasses = classSet('input', value && 'has-content')

    return (
        <div className='text-input'>
            <input
                type={inputType}
                id={name}
                className={inputClasses}
                name={name}
                value={value}
                onChange={(e) => onChange(e)}
                disabled={loading}
                autoFocus={autofocus}
            />
            {isPasswordInput && (
                <EyeIcon
                    onClick={togglePasswordVisible}
                    data-testid='eye-icon'
                />
            )}
            <label htmlFor={name}>{label}</label>
            <span className='focus-border'>
                <i />
            </span>
        </div>
    )
}

export default TextInput
