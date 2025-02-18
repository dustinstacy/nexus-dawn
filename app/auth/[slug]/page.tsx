"use client"

import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"

import { logo } from "@assets"
import { NavBar } from "@components"
import { useAuthStore } from "@stores"

import { AuthForm } from "../components"

import "./Auth.scss"

// Displays login of registration form based on the value of the register prop
const Auth = () => {
    const user = useAuthStore((state) => state.user)
    const pathname = usePathname()
    const router = useRouter()
    // Redirect to the home page if a user is already authenticated
    useEffect(() => {
        if (user) router.push("/")
    }, [user])

    const register = pathname?.includes("register")

    return (
        <div className='landing page center'>
            <NavBar landing />
            <div className='auth box around-column'>
                <img className='logo' src={logo.src} alt='logo' />
                <AuthForm register={register} />
            </div>
        </div>
    )
}

export default Auth
