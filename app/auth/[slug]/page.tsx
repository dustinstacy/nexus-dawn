"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavBar } from "@components"
import { AuthForm } from "../components"
import { logo } from "@assets"
import "./Auth.scss"

// Displays login of registration form based on the value of the register prop
const Auth = () => {
    const pathname = usePathname()
    // Redirect to the home page if a user is already authenticated
    // useEffect(() => {
    //     if (user) navigate("/")
    // }, [user])

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
