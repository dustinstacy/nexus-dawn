import { useRouter } from 'next/navigation'

import api from '@api'
import { Button } from '@components'
import stores from '@stores'

import './battleResultsButtons.scss'

interface BattleResultsButtonsProps {
	loading: boolean
}

const BattleResultsButtons = ({ loading }: BattleResultsButtonsProps) => {
	const { postBattleLog } = api
	const { useOpponentsStore } = stores
	const setSelectedOpponent = useOpponentsStore((state) => state.setSelectedOpponent)
	const setSelectedOpponentDeck = useOpponentsStore((state) => state.setSelectedOpponentDeck)
	const router = useRouter()

	const handleClick = async () => {
		const battleLog = localStorage.getItem('battleLog')
		await postBattleLog(battleLog as string)
		removeStateFromLocalStorage()
	}

	// Navigate to battle intro page with stored opponent and opponent deck state
	const rematch = async () => {
		await handleClick()
		router.push('/battle-intro', {})
	}

	const selectOpponent = async () => {
		await handleClick()
		setSelectedOpponent(null)
		setSelectedOpponentDeck(null)
		router.push('/opponent-select')
	}

	const mainMenu = async () => {
		await handleClick()
		setSelectedOpponent(null)
		setSelectedOpponentDeck(null)
		router.push('/')
	}

	const removeStateFromLocalStorage = () => {
		localStorage.removeItem('battleLog')
	}

	return (
		<div className="results-buttons">
			{!loading && (
				<>
					<Button
						label="Select Opponent"
						onClick={selectOpponent}
					/>
					<Button
						label="Rematch"
						onClick={rematch}
					/>
					<Button
						label="Main Menu"
						onClick={mainMenu}
					/>
				</>
			)}
		</div>
	)
}

export default BattleResultsButtons
