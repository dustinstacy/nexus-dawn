'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { smlogo } from '@assets'
import stores from '@stores'
import utils from '@utils'

import { BurgerMenu, Links, UserSection } from './components'

import './navBar.scss'

interface NavBarProps {
	login: boolean
}

// Renders navigation Bar component that includes page links and user information
// Renders a login button based on the value of the `login` prop
const NavBar = ({ login }: NavBarProps) => {
	const { useUserStore } = stores
	const router = useRouter()
	const user = useUserStore((state) => state.user)

	const stage = user?.onboardingStage ?? {}

	const logoClasses = utils.classSet('navbar__logo', (stage as number) <= 5 ? 'disabled' : '')

	return (
		<div className="navbar between background-gradient">
			<BurgerMenu />
			<img
				src={smlogo.src}
				alt="logo"
				className={logoClasses}
				onClick={() => router.push('/')}
			/>
			<Links menu="navbar" />
			{user ?
				<UserSection />
			: login ?
				<Link
					className="navbar__login box"
					href="/auth/login"
				>
					Login
				</Link>
			:	null}

			<hr className="gold-border" />
		</div>
	)
}

export default NavBar
