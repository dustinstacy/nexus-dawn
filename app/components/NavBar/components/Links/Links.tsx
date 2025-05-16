import Link from 'next/link'
import React from 'react'

import { navlinks } from '@constants'
import stores from '@stores'
import { classSet } from '@utils'

import './links.scss'

interface LinksProps {
	menu: string
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

// Renders a list of navigation links with customizable CSS classes and functionality.
// - menu: The identifier for the menu, used to generate CSS class names.
// - onClick: Add additional click event handler for the links.
const Links = ({ menu, onClick }: LinksProps) => {
	const { useUserStore } = stores
	const user = useUserStore((state) => state.user)
	const stage = user?.onboardingStage ?? {}
	const publicLinks = ['/', '/how-to-play']

	const linkClasses = (linkPath: string) =>
		classSet(
			`${menu}-link`,
			'center',
			(!user && !publicLinks.includes(linkPath)) || (stage as number) <= 5 ? 'disabled' : ''
		)

	return (
		<div
			className={`${menu}-links`}
			data-cy="links-container"
		>
			{navlinks.map((link) => (
				<Link
					className={linkClasses(link.path)}
					key={link.name}
					href={link.path}
					onClick={(e) => onClick?.(e)}
					data-cy="nav-link"
				>
					{link.image}
					<span data-cy="link-text">{link.name}</span>
				</Link>
			))}
		</div>
	)
}

export default Links
