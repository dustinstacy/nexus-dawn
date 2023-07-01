import React from 'react'
import { NavLink } from 'react-router-dom'

import { useGlobalContext } from '@context'
import { classSet } from '@utils'

import { navlinks } from './constants'
import './Links.scss'

// Renders a list of navigation links with customizable CSS classes and functionality.
// - menu: The identifier for the menu, used to generate CSS class names.
// - onClick: Add additional click event handler for the links.
const Links = ({ menu, onClick }) => {
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const publicLinks = ['/', '/rules']

    const linkClasses = (linkPath) =>
        classSet(
            `${menu}-link`,
            'center',
            ((!user && !publicLinks.includes(linkPath)) || stage <= 5) &&
                'disabled'
        )

    return (
        <div className={`${menu}-links`}>
            {navlinks.map((link) => (
                <NavLink
                    className={linkClasses(link.path)}
                    key={link.name}
                    to={link.path}
                    onClick={onClick}
                >
                    {link.image}
                    <span>{link.name}</span>
                </NavLink>
            ))}
        </div>
    )
}

export default Links
