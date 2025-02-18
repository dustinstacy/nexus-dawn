import { coinImage } from "@assets"
import { User } from "@interfaces"
import { useAuthStore } from "@stores"

import "./UserInventory.scss"

// Section to display user inventory items and counts
const UserInventory = () => {
    const user = useAuthStore((state) => state.user)
    const { coin } = (user as User) ?? {}

    return (
        <div className='user-inventory end-column'>
            <div className='coin end'>
                <p className='coin-amount'>{coin}</p>
                <img src={coinImage.src} alt='coin' />
            </div>
        </div>
    )
}

export default UserInventory
