
import { evaluate, evaluateSameAndPlus } from './evaluations'

// TMP config rules here
let RULES = {
    standard: true,
    low: false,
    same: true,
    plus: true
}

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

    // Relative positions of cards
    const CARD_UP = up?._id
    const CARD_RIGHT = !rightColumn.includes(index) && right?._id
    const CARD_DOWN = down?._id
    const CARD_LEFT = !leftColumn.includes(index) && left?._id

    //
    // "Same" and "Plus" evaluations
    // These take precedence over single evals
    //

    if (RULES.same || RULES.plus) {
        if (CARD_UP && CARD_RIGHT) {
            evaluateSameAndPlus(up, right, color, RULES, [up.values[2], right.values[3]], [values[0], values[1]])
        }

        if (CARD_UP && CARD_DOWN) {
            evaluateSameAndPlus(up, down, color, RULES, [up.values[2], down.values[0]], [values[0], values[2]])
        }

        if (CARD_UP && CARD_LEFT) {
            evaluateSameAndPlus(up, left, color, RULES, [up.values[2], left.values[1]], [values[0], values[3]])
        }

        if (CARD_RIGHT && CARD_DOWN) {
            evaluateSameAndPlus(right, down, color, RULES, [right.values[3], down.values[0]], [values[1], values[2]])
        }

        if (CARD_RIGHT && CARD_LEFT) {
            evaluateSameAndPlus(right, left, color, RULES, [right.values[3], left.values[1]], [values[1], values[3]])
        }

        if (CARD_DOWN && CARD_LEFT) {
            evaluateSameAndPlus(down, left, color, RULES, [down.values[0], left.values[1]], [values[2], values[3]])
        }
    }

    //
    // Single evaluations
    //

    if (CARD_UP) {
        evaluate(up, color, RULES, up.values[2], values[0])
    }
    if (CARD_RIGHT) {
        evaluate(right, color, RULES, right.values[3], values[1])
    }
    if (CARD_DOWN) {
        evaluate(down, color, RULES, down.values[0], values[2])
    }
    if (CARD_LEFT) {
        evaluate(left, color, RULES, left.values[1], values[3])
    }
}

export default processStandardBattles
