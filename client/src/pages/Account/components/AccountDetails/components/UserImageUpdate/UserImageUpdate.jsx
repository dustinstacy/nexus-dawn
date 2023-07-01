import React, { useState } from 'react'

import { updateUserInfo } from '@api'
import { Button, TextInput } from '@components'
import { useGlobalContext } from '@context'

import { validateURL } from './utils'
import './UserImageUpdate.scss'

const UserImageUpdate = () => {
    const { getCurrentUser } = useGlobalContext()

    const [newUserImage, setNewUserImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        setError('') // Clear any previous errors
        setNewUserImage(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            await validateURL(newUserImage)
            await updateUserInfo('image', newUserImage)
            await getCurrentUser()
        } catch (error) {
            setError(error.message) // Set the error message for display
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='image-input center'>
            <TextInput
                label='paste new image url here'
                name='newUserImage'
                value={newUserImage}
                onChange={handleInputChange}
                loading={loading}
            />
            {error && <p className='error'>{error}</p>}
            <Button
                label='Update Image'
                type='submit'
                onClick={handleSubmit}
                disabled={newUserImage.length === 0}
            />
        </div>
    )
}

export default UserImageUpdate
