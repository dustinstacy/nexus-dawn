import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, TextInput } from '@components'
import { useGlobalContext } from '@context'

import { sendAuthRequest } from './api'
import { FormFooter } from './components'
import { toCamelCase } from './utils'
import './AuthForm.scss'

// Displays login of registration form based on the value of the register prop
const AuthForm = ({ register }) => {
    const { getGlobalState } = useGlobalContext()

    const initialFormData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [formData, setFormData] = useState(initialFormData)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    // Define the form fields to be rendered based on the value of register prop
    const formFields = ['Username', 'Password']
    if (register) {
        formFields.splice(1, 0, 'Email')
        formFields.splice(3, 0, 'Confirm Password')
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setErrors({})
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await sendAuthRequest(formData, register)
            await getGlobalState()
            navigate('/') // Refresh user data after updating and navigate to Home page
        } catch (error) {
            if (error?.response?.data) {
                setErrors(error.response.data)
            }
        } finally {
            setLoading(false)
        }
    }

    // Execute handleSubmit function when user presses Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    const reset = () => {
        setFormData(initialFormData)
        setLoading(false)
        setErrors({})
    }

    // Reset the form data, loading state, and errors when the register prop changes
    useEffect(() => {
        reset()
    }, [register])

    return (
        <div className='auth-form center'>
            <form className='form center' onKeyDown={(e) => handleKeyDown(e)}>
                {formFields.map((field) => (
                    <React.Fragment key={field}>
                        <TextInput
                            label={field}
                            name={toCamelCase(field)}
                            value={formData[toCamelCase(field)]}
                            onChange={handleInputChange}
                            loading={loading}
                            autofocus={field === 'Username'}
                        />
                        {errors[toCamelCase(field)] && (
                            <p className='error'>
                                {errors[toCamelCase(field)]}
                            </p>
                        )}
                    </React.Fragment>
                ))}

                {Object.keys(errors).length > 0 && !register && (
                    <p className='error'>Nope. Try Again.</p>
                )}
                <FormFooter register={register} />
            </form>
            <Button
                label='Submit'
                type='submit'
                onClick={handleSubmit}
                disabled={loading}
                onKeyDown
            />
        </div>
    )
}

export default AuthForm
