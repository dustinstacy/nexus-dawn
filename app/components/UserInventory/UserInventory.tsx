import { coinImage } from '@assets'
import { User } from '@interfaces'
import stores from '@stores'

import './userInventory.scss'

// Section to display user inventory items and counts
const UserInventory = () => {
	const user = stores.useUserStore((state) => state.user)
	const { coin } = (user as User) ?? {}

	return (
		<div
			className="user-inventory end-column"
			data-cy="user-inventory"
		>
			<div className="coin end">
				<p
					className="coin-amount"
					data-cy="coin"
				>
					{coin}
				</p>
				<img
					src={coinImage.src}
					alt="coin"
					data-cy="coin-image"
				/>
			</div>
		</div>
	)
}

export default UserInventory
