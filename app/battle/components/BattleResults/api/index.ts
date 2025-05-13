import { customFetch } from '@utils'

interface UpdateDefeatedEnemiesProps {
	defeatedEnemies: string[]
	enemy: string
}

export const updateDefeatedEnemies = async ({
	defeatedEnemies,
	enemy
}: UpdateDefeatedEnemiesProps) => {
	await customFetch('/api/profile/info', {
		method: 'PUT',
		body: JSON.stringify({
			defeatedEnemies: [...defeatedEnemies, enemy]
		})
	})
}
