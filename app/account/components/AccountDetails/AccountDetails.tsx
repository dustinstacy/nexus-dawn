'use client'

import { Avatar } from '@components'
import stores from '@stores'

import { AvatarUpdate } from './components'

import './accountDetails.scss'

// A component that displays the account details of the current user.
const AccountDetails = () => {
	const { useUserStore } = stores
	const user = useUserStore((state) => state.user)

	return (
		<div className="account-details">
			<h1>Account</h1>
			<div className="box">
				<div className="wrapper center">
					<Avatar medium />
					<div className="section">
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
				<AvatarUpdate />
			</div>
		</div>
	)
}

export default AccountDetails
