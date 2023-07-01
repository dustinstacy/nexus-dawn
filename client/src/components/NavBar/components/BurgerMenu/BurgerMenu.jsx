import React, { useEffect } from 'react'
import { MdOutlineClose, MdMenu } from 'react-icons/md'
import useMediaQuery from '@mui/material/useMediaQuery'
import { motion } from 'framer-motion'

import { useToggle } from '@hooks'

import { Links } from '..'
import './BurgerMenu.scss'

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
        <div className='burger-menu'>
            {!isOpen ? (
                <MdMenu onClick={() => toggleIsOpen()} />
            ) : (
                <MdOutlineClose onClick={() => toggleIsOpen()} />
            )}
            <motion.div
                className='menu background-gradient'
                initial={{ width: 0 }}
                animate={
                    isSmallScreen
                        ? { width: isOpen ? '40vw' : '0' }
                        : { width: isOpen ? '60vw' : '0' }
                }
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                }}
            >
                <Links menu='burger-menu' onClick={() => setIsOpen(false)} />
            </motion.div>
        </div>
    )
}

export default BurgerMenu
