import React from 'react'
import { NavLink } from 'react-router-dom'

import { useGlobalContext } from '@context'
import { Onboarding } from '@components'
import { classSet } from '@utils'

import { mainPanels, subPanels } from './constants'
import './Home.scss'
import { User } from 'src/global.interfaces'

const Home = () => {
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const linkClasses = (className: string, type: string) =>
        classSet(
            `${className}-${type}`,
            'panel',
            'start-column',
            !user ? 'disabled' : ''
        )

    return (
        <>
            {(stage as number) <= 5 && <Onboarding />}

            <div className='home page start'>
                <div className='home-wrapper '>
                    {mainPanels.map((panel) => (
                        <NavLink
                            key={panel.className}
                            to={panel.to}
                            className={linkClasses(panel.className, panel.type)}
                        >
                            <p>{panel.text}</p>
                            <h1>{panel.header}</h1>
                        </NavLink>
                    ))}
                    <div className='subs start-column'>
                        {subPanels(user as User).map((panel) => (
                            <NavLink
                                key={panel.className}
                                to={panel.to}
                                className={linkClasses(
                                    panel.className,
                                    panel.type
                                )}
                            >
                                {panel.jsx}
                            </NavLink>
                        ))}
                        <a
                            className={linkClasses('contact', 'sub')}
                            href='https://discord.gg/TTn4pCHxXT'
                        >
                            <h2>Contact</h2>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
