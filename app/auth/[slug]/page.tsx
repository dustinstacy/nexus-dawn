'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { logo } from '@assets'
import { useUserStore } from '@stores'

import { AuthForm } from '../components'

import './auth.scss'

const Auth = () => {
	const user = useUserStore((state) => state.user)
	const pathname = usePathname()
	const router = useRouter()

	// Redirect to the home page if a user is already authenticated
	useEffect(() => {
		if (user) router.push('/')
		// eslint-disable-next-line react-hooks/exhaustive-deps -- only run once
	}, [])

	const isRegister = pathname?.includes('register')

	return (
		<div className="auth page center">
			<div className="login box around-column">
				<img
					className="logo"
					src={logo.src}
					alt="logo"
				/>
				<AuthForm register={isRegister} />
			</div>
		</div>
	)
}

export default Auth
