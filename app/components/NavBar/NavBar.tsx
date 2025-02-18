import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { smlogo } from "@assets"
import { useAuthStore } from "@stores"
import { classSet } from "@utils"

import { BurgerMenu, Links, UserSection } from "./components"

import "./NavBar.scss"

interface NavBarProps {
    landing: boolean
}

// Renders navigation Bar component that includes page links and user information
// Renders a login button based on the value of the `landing` prop
const NavBar = ({ landing }: NavBarProps) => {
    const router = useRouter()
    const user = useAuthStore((state) => state.user)
    const checkToken = useAuthStore((state) => state.checkToken)

    useEffect(() => {
        checkToken()
    }, [checkToken])

    const stage = user?.onboardingStage ?? {}

    const logoClasses = classSet("navbar__logo", (stage as number) <= 5 ? "disabled" : "")

    return (
        <div className='navbar between background-gradient'>
            <BurgerMenu />
            <img src={smlogo.src} alt='logo' className={logoClasses} onClick={() => router.push("/")} />
            <Links menu='navbar' />
            {user ? (
                <UserSection />
            ) : landing ? null : (
                <Link className='navbar__login box' href='/login'>
                    Login
                </Link>
            )}

            <hr className='gold-border' />
        </div>
    )
}

export default NavBar
