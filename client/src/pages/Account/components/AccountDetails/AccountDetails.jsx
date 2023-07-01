import React from 'react'

import { Avatar } from '@components'
import { useGlobalContext } from '@context'

import { UserImageUpdate } from './components'
import './AccountDetails.scss'

// A component that displays the account details of the current user.
const AccountDetails = () => {
    const { user } = useGlobalContext()

    return (
        <div className='account-details'>
            <h1>Account</h1>
            <div className='box'>
                <div className='wrapper center'>
                    <Avatar medium />
                    <div className='section'>
                        <span>
                            Username:
                            <p>{user?.username}</p>
                        </span>
                        <span>
                            Email:
                            <p>{user?.email}</p>
                        </span>
                    </div>
                </div>
                <UserImageUpdate />
            </div>
        </div>
    )
}

export default AccountDetails
