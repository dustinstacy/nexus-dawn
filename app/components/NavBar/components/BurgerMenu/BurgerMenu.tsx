import useMediaQuery from '@mui/material/useMediaQuery'
import { MdMenu } from '@react-icons/all-files/md/MdMenu'
import { MdOutlineClose } from '@react-icons/all-files/md/MdOutlineClose'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

import { useToggle } from '@hooks'

import { Links } from '..'
import './burgerMenu.scss'

// Renders burger icon menu for navigation bar
const BurgerMenu = () => {
	const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false)
	const isSmallScreen = useMediaQuery('(min-width:600px)')

	// Reset the menu state when unmounting or when the screen size changes
	useEffect(() => {
		return () => {
			setIsOpen(false)
		}
	}, [, isSmallScreen])

	return (
		<div className="burger-menu">
			{!isOpen ?
				<MdMenu
					onClick={() => toggleIsOpen()}
					data-cy="open-icon"
				/>
			:	<MdOutlineClose
					onClick={() => toggleIsOpen()}
					data-cy="close-icon"
				/>
			}
			<motion.div
				className="menu background-gradient"
				initial={{ width: 0 }}
				animate={{ width: isOpen ? `${isSmallScreen ? '40' : '60'}vw` : '0' }}
				transition={{
					duration: 0.3,
					ease: 'easeInOut'
				}}
			>
				<Links
					menu="burger-menu"
					onClick={() => setIsOpen(false)}
				/>
			</motion.div>
		</div>
	)
}

export default BurgerMenu
