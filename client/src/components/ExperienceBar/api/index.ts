import axios from 'axios'
import { User } from 'src/global.interfaces'

export const handleLevelUp = async (user: User) => {
    try {
        await axios.put('/api/profile/stats', { level: user.level + 1 })
        await axios.put('/api/profile/info', {
            coin: user.coin + (user.level + 1) * 1.5 * 100,
        })
    } catch (error) {
        console.error('Error updating user level:', error)
    }
}
