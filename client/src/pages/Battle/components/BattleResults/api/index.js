import axios from 'axios'

// Add defeated enemy to user's defeated enemies list
export const updatedDefeatedEnemies = async (defeatedEnemies, enemy) => {
    await axios.put('/api/profile/info', {
        defeatedEnemies: [...defeatedEnemies, enemy],
    })
}
