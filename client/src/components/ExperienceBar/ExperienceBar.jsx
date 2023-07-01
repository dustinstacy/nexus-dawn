import React, { useEffect, useState } from 'react'

import { ModalOverlay } from '@components'
import { useGlobalContext } from '@context'

import { handleLevelUp } from './api'
import { LevelUpScreen } from './components'
import { userLevels } from './constants'
import './ExperienceBar.scss'

// Renders the user's experience bar and handles level up functionality when XP thresholds are reached.
const ExperienceBar = () => {
    const { getCurrentUser, user } = useGlobalContext()
    const { xp, level } = user ?? {}

    const [newLevelAlert, setNewLevelAlert] = useState(false)
    const [startXP, setStartXP] = useState(xp)
    const [displayXP, setDisplayXP] = useState(xp - userLevels[level - 1])

    // Store the xp values of previous and next level
    const userPrevLevel = userLevels[level - 1]
    const userNextLevel = userLevels[level]

    // Calculates the percentage of xp gained towards the next level.
    const xpPercentage = () => {
        return `${
            ((xp - userPrevLevel) / (userNextLevel - userPrevLevel)) * 100
        }%`
    }

    // Checks if the user has leveled up when they gain xp
    useEffect(() => {
        const checkLevelUp = async () => {
            if (xp >= userNextLevel) {
                await handleLevelUp(user)
                await getCurrentUser()
                setTimeout(async () => {
                    setNewLevelAlert(true)
                }, 3000)
            }
        }

        checkLevelUp()
    }, [xp, userNextLevel])

    // Animate the displayed xp to increment to the new total xp
    useEffect(() => {
        if (startXP !== xp) {
            const startTime = Date.now()
            const duration = 1000
            const targetXP = xp

            const animateXP = () => {
                const currentTime = Date.now()
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)

                const updatedXP = Math.round(
                    startXP + (targetXP - startXP) * progress
                )

                if (updatedXP >= userNextLevel) {
                    // If the updated XP exceeds the next level, reset the start XP and subtract the next level XP from the updated XP
                    setStartXP(startXP + userNextLevel)
                    setDisplayXP(updatedXP - userNextLevel)
                } else {
                    setDisplayXP(updatedXP - userPrevLevel)
                }

                if (progress < 1) {
                    requestAnimationFrame(animateXP)
                }
            }

            requestAnimationFrame(animateXP)
        }
    }, [xp])

    return (
        <div className='experience-bar center-column'>
            <div className='progress-bar'>
                <div
                    className='progress-bar__inner'
                    style={{ width: xpPercentage() }}
                ></div>
            </div>
            <span>
                XP {displayXP ? displayXP : 0} / {userNextLevel - userPrevLevel}
            </span>
            {newLevelAlert && (
                <ModalOverlay>
                    <LevelUpScreen setNewLevelAlert={setNewLevelAlert} />
                </ModalOverlay>
            )}
        </div>
    )
}

export default ExperienceBar
