'use client'

import { MdLogout } from '@react-icons/all-files/md/MdLogout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { HandleToggle } from '@interfaces'
import stores from '@stores'
import { classSet } from '@utils'

import './avatarMenu.scss'

// Renders the menu that is displayed when the user clicks on their navigation bar image.
const AvatarMenu = ({ isOpen, toggleIsOpen }: HandleToggle) => {
	const { useUserStore } = stores
	const user = useUserStore((state) => state.user)
	const setUser = useUserStore((state) => state.setUser)
	const stage = (user?.onboardingStage as number) ?? {}
	const router = useRouter()

	const handleLogout = async () => {
		sessionStorage.removeItem('accessToken')
		setUser(null)
		toggleIsOpen?.()
		router.push('/auth/login')
	}

	const disabledLinkClass = classSet(stage < 5 ? 'disabled' : '')

	return (
		<>
			{isOpen && (
				<div className="avatar-menu box center-column">
					<Link
						className={disabledLinkClass}
						href="/account"
						onClick={() => toggleIsOpen?.()}
					>
						Account
					</Link>
					<a
						className="avatar-menu-link center"
						onClick={() => handleLogout()}
					>
						Logout <MdLogout />
					</a>
				</div>
			)}
		</>
	)
}

export default AvatarMenu
