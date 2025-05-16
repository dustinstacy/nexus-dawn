'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { classSet } from '@utils'
import './button.scss'

interface ButtonProps {
	label: string
	path?: string
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
	onKeyDown?: boolean
	dataCy?: string
}

// Renders button component that can function as a navigation link or a custom onClick function.
// Set 'path' to navigate to a specific page.
// Set 'onClick' to define a custom function to execute on button click.
const Button = ({ label, path, onClick, disabled, dataCy }: ButtonProps) => {
	const router = useRouter()

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		!!path ? router.push(`${path}`) : onClick?.(e)
	}

	const buttonClasses = classSet('button', 'center', disabled ? 'disabled' : '')

	return (
		<button
			className={buttonClasses}
			onClick={(e) => handleClick(e)}
			data-cy={dataCy}
		>
			<span>{label}</span>
		</button>
	)
}
export default Button
