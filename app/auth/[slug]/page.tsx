'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Image from 'next/image'
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
	}, [])

	const register = pathname?.includes('register')

	return (
		<div className="auth page center">
			<div className="login box around-column">
				<Image 
					className="logo"
					src={logo.src}
					alt="logo"
				/>
				<AuthForm register={register} />
			</div>
		</div>
	)
}

export default Auth
