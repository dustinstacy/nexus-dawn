import { ICard } from '@interfaces'

const cpuMove = (hand: Array<ICard | null>, board: Array<any>, emptyCells: Array<any>) => {
	const newBoard = board
	const newHand = hand
	let bestScore = -Infinity
	let move: { card: any; cell: number } = { card: null, cell: 0 }

	hand.forEach((card) => {
		emptyCells.forEach((cell) => {
			let score = 0
			const up = board[cell - 3]
			const right = board[cell + 1]
			const left = board[cell - 1]
			const down = board[cell + 3]
			const topRow = [0, 1, 2]
			const leftColumn = [0, 3, 6]
			const rightColumn = [2, 5, 8]
			const bottomRow = [6, 7, 8]
			const values = card!.values

			if (!topRow.includes(cell) && up !== 'empty') {
				if (up.values[2] < values[0]) {
					score += 100 + (parseInt(up.values[2]) - values[0])
				}
			}
			if (!topRow.includes(cell) && up === 'empty') {
				score += values[0]
			}
			if (topRow.includes(cell)) {
				score -= values[0]
			}

			if (!leftColumn.includes(cell) && left !== 'empty') {
				if (left.values[1] < values[3]) {
					score += 100 + (parseInt(left.values[1]) - values[3])
				}
			}
			if (!leftColumn.includes(cell) && left === 'empty') {
				score += values[3]
			}
			if (leftColumn.includes(cell)) {
				score -= values[3]
			}

			if (!rightColumn.includes(cell) && right !== 'empty') {
				if (right.values[3] < values[1]) {
					score += 100 + (parseInt(right.values[3]) - values[1])
				}
			}

			if (!rightColumn.includes(cell) && right !== 'empty') {
				score += values[1]
			}
			if (rightColumn.includes(cell)) {
				score -= values[1]
			}

			if (!bottomRow.includes(cell) && down !== 'empty') {
				if (down.values[0] < values[2]) {
					score += 100 + (parseInt(down.values[0]) - values[2])
				}
			}

			if (!bottomRow.includes(cell) && down !== 'empty') {
				score += values[2]
			}
			if (bottomRow.includes(cell)) {
				score -= values[2]
			}
			if (score > bestScore) {
				bestScore = score
				move = { card: card, cell: cell }
			}
		})
	})
	newBoard.splice(move.cell, 1, move.card)
	const cardIndex = newHand.findIndex((handCard) => handCard!._id === move.card._id)
	if (cardIndex !== -1) {
		newHand.splice(cardIndex, 1)
	}
	return { move, newHand, newBoard }
}

export default cpuMove
