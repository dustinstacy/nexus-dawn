import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { logo } from '@assets'
import { NavBar } from '@components'
import { useGlobalContext } from '@context'
import { useWindowResize } from '@hooks'

import { AuthForm } from './components'
import './Landing.scss'

// Displays login of registration form based on the value of the register prop
const Landing = ({ register }) => {
    const { user } = useGlobalContext()
    const { height, width } = useWindowResize()
    const navigate = useNavigate()

    // Redirect to the home page if a user is already authenticated
    useEffect(() => {
        if (user) navigate('/')
    }, [user])

    return (
        <div className='landing page center'>
            <NavBar landing />
            <div className='auth box around-column'>
                <img className='logo' src={logo} alt='logo' />
                <AuthForm register={register} />
            </div>
            {width > 1200 && height !== window.screen.availHeight ? (
                <div className='tip__fullscreen'>
                    *Press F11 for fullscreen experience.
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Landing
