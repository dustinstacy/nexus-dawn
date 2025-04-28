'use client'

import { useEffect, useState } from 'react'

import { postBattleLog, updateUserStats } from '@api'
import { Alert, Button } from '@components'
import { BattleResult, User } from '@interfaces'
import { useOpponentsStore, useUserStore } from '@stores'

import { BattlePreviewModal, OpponentCard } from './components'
import './opponentSelect.scss'

// Renders a menu of CPU opponents to select from.
// Displays alert if saved battle state exists.
const OpponentSelect = () => {
	const user = useUserStore((state) => state.user)
	const allOpponents = useOpponentsStore((state) => state.allOpponents)
	const selectedOpponent = useOpponentsStore((state) => state.selectedOpponent)
	const setSelectedOpponent = useOpponentsStore((state) => state.setSelectedOpponent)
	const [alertActive, setAlertActive] = useState(false)

	const sortedOpponents = allOpponents.sort((a, b) => a.level - b.level)

	// Check for a saved battle state when component mounts.
	// If saved state exists, display the battle alert.
	// Otherwise, fetch the list of opponents
	useEffect(() => {
		const savedState = localStorage.getItem('battleLog')
		if (savedState) {
			setAlertActive(true)
		}
	}, [alertActive])

	const forfeitBattle = async () => {
		const battleLog = localStorage.getItem('battleLog')

		await postBattleLog(battleLog as string)

		localStorage.removeItem('battleLog')
		await updateUserStats(user as User, 'loss' as BattleResult)
		setAlertActive((current) => !current)
	}

	return (
		<div className="opponent-select page center">
			<div className="background fill" />
			<div className="header">
				<h1>Choose your opponent</h1>
				<hr />
			</div>
			<div className="opponent-list center">
				{sortedOpponents?.length &&
					sortedOpponents?.map((opponent) => (
						<OpponentCard
							key={opponent.name}
							opponent={opponent}
							selectedOpponent={selectedOpponent}
							setSelectedOpponent={setSelectedOpponent}
						/>
					))}
			</div>
			{alertActive && (
				<Alert>
					<h2>You currently have an unfinished battle</h2>
					<div className="buttons">
						<Button
							label="Rejoin"
							path="/battle"
							type="link"
						/>
						<Button
							label="Forefeit"
							onClick={() => forfeitBattle()}
						/>
					</div>
					<p>*Forfeiting will count as a loss</p>
				</Alert>
			)}
			{selectedOpponent && <BattlePreviewModal />}
		</div>
	)
}

export default OpponentSelect
