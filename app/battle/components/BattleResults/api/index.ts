import utils from '@utils'

interface UpdateDefeatedEnemiesProps {
	defeatedEnemies: string[]
	enemy: string
}

export const updateDefeatedEnemies = async ({
	defeatedEnemies,
	enemy
}: UpdateDefeatedEnemiesProps) => {
	await utils.customFetch('/api/profile/info', {
		method: 'PUT',
		body: JSON.stringify({
			defeatedEnemies: [...defeatedEnemies, enemy]
		})
	})
}
