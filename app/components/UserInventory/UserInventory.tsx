import { coinImage } from '@assets'
import { User } from '@interfaces'
import { useUserStore } from '@stores'

import './userInventory.scss'
import Image from 'next/image'

// Section to display user inventory items and counts
const UserInventory = () => {
	const user = useUserStore((state) => state.user)
	const { coin } = (user as User) ?? {}

	return (
		<div className="user-inventory end-column">
			<div className="coin end">
				<p className="coin-amount">{coin}</p>
				<Image
					src={coinImage.src}
					alt="coin"
				/>
			</div>
		</div>
	)
}

export default UserInventory
