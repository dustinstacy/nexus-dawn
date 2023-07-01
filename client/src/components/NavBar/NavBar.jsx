import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import { smlogo } from '@assets'
import { useGlobalContext } from '@context'
import { classSet } from '@utils'

import { BurgerMenu, Links, UserSection } from './components'
import './NavBar.scss'

// Renders navigation Bar component that includes page links and user information
// Renders a login button based on the value of the `landing` prop
const NavBar = ({ landing }) => {
    const navigate = useNavigate()

    const { user } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const logoClasses = classSet('navbar__logo', stage <= 6 && 'disabled')

    return (
        <div className='navbar between background-gradient'>
            <BurgerMenu />
            <img
                src={smlogo}
                alt='logo'
                className={logoClasses}
                onClick={() => navigate('/')}
            />
            <Links menu='navbar' />
            {user ? (
                <UserSection />
            ) : landing ? null : (
                <NavLink className='navbar__login box' to='/login'>
                    Login
                </NavLink>
            )}

            <hr className='gold-border' />
        </div>
    )
}

export default NavBar
