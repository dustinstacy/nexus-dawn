import React from 'react'
import { AccountDetails, PromoCode } from './components'

import './Account.scss'

const Account = () => {
    return (
        <div className='account page start-column'>
            <AccountDetails />
            <PromoCode />
        </div>
    )
}

export default Account
