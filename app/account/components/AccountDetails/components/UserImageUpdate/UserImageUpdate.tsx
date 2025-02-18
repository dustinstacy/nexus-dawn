"use client"

import React, { useEffect, useState } from "react"

import { updateUserInfo } from "@api"
import { Button, TextInput } from "@components"
import { User } from "@interfaces"
import { useUserStore } from "@stores"

import { validateURL } from "./utils"
import "./userImageUpdate.scss"

const UserImageUpdate = () => {
    const [newUserImage, setNewUserImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const updateUser = useUserStore((state) => state.updateUser)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("") // Clear any previous errors
        setNewUserImage(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await validateURL(newUserImage)
            await updateUserInfo("image", newUserImage)
            await updateUser()
        } catch (error: any) {
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
            <Button label='Update Image' type='submit' onClick={handleSubmit} disabled={newUserImage.length === 0} />
        </div>
    )
}

export default UserImageUpdate
