import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'

import { useGlobalContext } from '@context'
import { classSet } from '@utils'

import './AvatarMenu.scss'

// Renders the menu that is displayed when the user clicks on their navigation bar image.
const AvatarMenu = ({ isOpen, toggleIsOpen }) => {
    const { user, logout } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        toggleIsOpen()
        navigate('/login')
    }

    const disabledLinkClass = classSet(stage < 5 && 'disabled')

    return (
        isOpen && (
            <div className='avatar-menu box center-column'>
                <NavLink
                    className={disabledLinkClass}
                    to='/account'
                    onClick={() => toggleIsOpen()}
                >
                    Account
                </NavLink>
                <a
                    className='avatar-menu-link center'
                    onClick={() => handleLogout()}
                >
                    Logout <MdLogout />
                </a>
            </div>
        )
    )
}

export default AvatarMenu
