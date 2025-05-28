'use client'

import { useEffect, useState } from 'react'

import api from '@api'
import { Alert, Button } from '@components'
import { BattleResult, User } from '@interfaces'
import stores from '@stores'

import { BattlePreviewModal, OpponentCard } from './components'
import './opponentSelect.scss'

// Renders a menu of CPU opponents to select from.
// Displays alert if saved battle state exists.
const OpponentSelect = () => {
	const { postBattleLog, updateUserStats } = api
	const { useOpponentsStore, useUserStore } = stores
	const user = useUserStore((state) => state.user)
	const { allOpponents, selectedOpponent, setSelectedOpponent } = useOpponentsStore(
		(state) => state
	)
	const [alertActive, setAlertActive] = useState(false)

	const sortedOpponents = allOpponents?.sort((a, b) => a.level - b.level) || []

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
		<div
			className="opponent-select page center"
			data-cy="opponent-select-outer"
		>
			<div
				className="background fill"
				data-cy="background"
			/>
			<div className="header">
				<h1 data-cy="page-heading">Choose your opponent</h1>
				<hr />
			</div>
			<div
				className="opponent-list center"
				data-cy="opponent-list"
			>
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
					<h2 data-cy="unfinished-battle-msg">You currently have an unfinished battle</h2>
					<div className="buttons">
						<Button
							label="Rejoin"
							path="/battle"
							dataCy="rejoin-battle-button"
						/>
						<Button
							label="Forfeit"
							onClick={() => forfeitBattle()}
							dataCy="forfeit-battle-button"
						/>
					</div>
					<p data-cy="forfeit-warning-msg">*Forfeiting will count as a loss</p>
				</Alert>
			)}
			{selectedOpponent && <BattlePreviewModal />}
		</div>
	)
}

export default OpponentSelect
