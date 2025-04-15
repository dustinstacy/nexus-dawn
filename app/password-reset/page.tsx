"use client"

import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense, useState, useEffect } from "react"
import { Button, TextInput } from "@components"
import { toast } from "react-toastify"
import { updatePassword } from "./api"
import { logo } from "@assets"
import "./passwordReset.scss"

function ResetPasswordContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (searchParams && !token) {
            toast.error("Invalid or expired reset link")
            router.replace("/login")
        }
    }, [searchParams, token, router])

    const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!token) {
            toast.error("Invalid or missing token")
            return
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        setLoading(true)
        try {
            await updatePassword(token, password)
            toast.success("Password reset successfully. Please log in")
            setTimeout(() => {
                router.replace("/auth/login")
            }, 1500)
        } catch (error) {
            console.error("Error resetting password:", error)
            toast.error("Failed to reset password. Try again")
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }

    if (searchParams && !token) {
        return <div>Invalid link...</div>
    }

    return (
        <div className='reset-password page center'>
            <div className=' reset-container box around-column'>
                <img className='logo' src={logo.src} alt='logo' />
                <h2>Reset Password</h2>
                <form className='form' onKeyDown={handleKeyDown}>
                    <TextInput
                        label='New Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        loading={false}
                    />
                    <TextInput
                        label='Confirm Password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        loading={false}
                    />
                </form>
                <Button
                    label={loading ? "Resetting..." : "Reset Password"}
                    type='submit'
                    onClick={handleSubmit}
                    disabled={loading}
                />
            </div>
        </div>
    )
}

function LoadingFallback() {
    return (
        <div className='reset-password page center'>
            <div className=' reset-container box around-column'>
                <h2>Loading...</h2>
            </div>
        </div>
    )
}

export default function PasswordResetPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordContent />
        </Suspense>
    )
}
