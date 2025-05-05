'use client'

import { AccountDetails, PromoCode } from './components'

import './account.scss'

const Account = () => {
	return (
		<div className="account page start-column">
			<AccountDetails />
			<PromoCode />
		</div>
	)
}

export default Account
