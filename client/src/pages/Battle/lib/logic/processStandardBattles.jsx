// Process integer evaluations between opposing cards that are touching
// to determine outcome
const processStandardBattles = (index, card, battleState) => {
    const { board } = battleState
    const { color, values } = card
    const up = board[index - 3]
    const right = board[index + 1]
    const left = board[index - 1]
    const down = board[index + 3]
    const leftColumn = [0, 3, 6]
    const rightColumn = [2, 5, 8]

    if (up?._id) {
        if (up.values[2] < values[0]) {
            if (up.color !== color) {
                up.color = color
                up.captured = !up.captured
            }
        }
    }
    if (!rightColumn.includes(index) && right?._id) {
        if (right.values[3] < values[1]) {
            if (right.color !== color) {
                right.color = color
                right.captured = !right.captured
            }
        }
    }
    if (down?._id) {
        if (down.values[0] < values[2]) {
            if (down.color !== color) {
                down.color = color
                down.captured = !down.captured
            }
        }
    }
    if (!leftColumn.includes(index) && left?._id) {
        if (left.values[1] < values[3]) {
            if (left.color !== color) {
                left.color = color
                left.captured = !left.captured
            }
        }
    }
}

export default processStandardBattles
