import { coinImage } from '@assets'
import { User } from '@interfaces'
import stores from '@stores'

import './userInventory.scss'

// Section to display user inventory items and counts
const UserInventory = () => {
	const { useUserStore } = stores
	const user = useUserStore((state) => state.user)
	const { coin } = (user as User) ?? {}

	return (
		<div className="user-inventory end-column">
			<div className="coin end">
				<p className="coin-amount">{coin}</p>
				<img
					src={coinImage.src}
					alt="coin"
				/>
			</div>
		</div>
	)
}

export default UserInventory
