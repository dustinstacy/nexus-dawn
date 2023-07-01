import React, { useEffect } from 'react'
import { TbPlayCard } from 'react-icons/tb'

import { Avatar, ExperienceBar } from '@components'
import { useGlobalContext } from '@context'

import './UserPanel.scss'

// Renders user information including experience gained, battle stats, and card counts
const UserPanel = () => {
    const { getCurrentUser, user, userCards } = useGlobalContext()
    const { level, stats, username } = user ?? {}
    const uniqueCards = [...new Set(userCards.map((card) => card.name))]

    useEffect(() => {
        // Call to ensure xp is updated
        getCurrentUser()
    }, [])

    return (
        <div className='user-panel center'>
            <div className='panel center'>
                <div className='user center-column'>
                    <div className='user__details end'>
                        <Avatar medium />
                        <div>
                            <div className='top between'>
                                <h1>{username}</h1>
                                <h1>LVL &nbsp; {level}</h1>
                            </div>
                            <hr />
                            <ExperienceBar />
                        </div>
                    </div>
                    <div className='user__stats fill'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Battles:</th>
                                    <td>{stats?.battles}</td>
                                </tr>
                                <tr>
                                    <th>Wins :</th>
                                    <td>{stats?.wins}</td>
                                </tr>
                                <tr>
                                    <th>Losses :</th>
                                    <td>{stats?.losses}</td>
                                </tr>
                                <tr>
                                    <th>Draws :</th>
                                    <td>{stats?.draws}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr>
                                    <th>
                                        Total <TbPlayCard /> :
                                    </th>
                                    <td>{userCards.length}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Unique <TbPlayCard /> :
                                    </th>
                                    <td>{uniqueCards.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPanel
