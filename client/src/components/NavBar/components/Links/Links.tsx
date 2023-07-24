import React from 'react'
import { NavLink } from 'react-router-dom'

import { useGlobalContext } from '@context'
import { classSet } from '@utils'

import { navlinks } from './constants'
import './Links.scss'

interface LinksProps {
    menu: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

// Renders a list of navigation links with customizable CSS classes and functionality.
// - menu: The identifier for the menu, used to generate CSS class names.
// - onClick: Add additional click event handler for the links.
const Links = ({ menu, onClick }: LinksProps) => {
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const publicLinks = ['/', '/rules']

    const linkClasses = (linkPath: string) =>
        classSet(
            `${menu}-link`,
            'center',
            (!user && !publicLinks.includes(linkPath)) || (stage as number) <= 5
                ? 'disabled'
                : ''
        )

    return (
        <div className={`${menu}-links`}>
            {navlinks.map((link) => (
                <NavLink
                    className={linkClasses(link.path)}
                    key={link.name}
                    to={link.path}
                    onClick={(e) => onClick?.(e)}
                >
                    {link.image}
                    <span>{link.name}</span>
                </NavLink>
            ))}
        </div>
    )
}

export default Links
