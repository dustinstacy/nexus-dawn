
import { evaluate, evaluateSameAndPlus } from './evaluations'

// TMP config rules here
// Remove once battleProcessor accepts rules as an arg
let RULES = {
    standard: true,
    low: false,
    same: true,
    plus: true
}

/**
 * Process integer evaluations between opposing cards that are touching
 * to determine outcome
 * @dev the "same" and "plus" rules currently take precedence over single evaluations.
 *      This function should be benchmarked with different flows to determine the most
 *      efficient approach to evaluations.
 * @dev For single evaluations, the current flow order is:
 *          1. Check if opponent
 *          2. Check game mode
 *          3. Check evaluation
 *          4. Capture
 * @dev For "same" and "plus", the current flow order is:
 *          1. Check if "plus",
 *          2. Check evaluation
 *          3. Check if opponent
 *          4. Capture
 *          5. Check if "same"
 *          6. Check evaluation
 *          7. Check if opponent
 *          8. Capture
 * @param {number} index - the location on the board. Starting from top-bottom and left-right:
 *                         Top: 0, 1, 2 | Middle: 3, 4, 5 | Bottom: 6, 7, 8
 * @param {object} card - the active card
 * @param {object} battleState - the current state of the board and battle
 */
const battleProcessor = (index, card, battleState) => {
    const { board } = battleState
    const { color, values } = card
    const up = board[index - 3]
    const right = board[index + 1]
    const left = board[index - 1]
    const down = board[index + 3]
    const leftColumn = [0, 3, 6]
    const rightColumn = [2, 5, 8]

    // Direction is relative from the active card's context
    // e.g. CARD_UP means the target is above the active card
    const CARD_UP = up?._id
    const CARD_RIGHT = !rightColumn.includes(index) && right?._id
    const CARD_DOWN = down?._id
    const CARD_LEFT = !leftColumn.includes(index) && left?._id

    /**
     * "Same" and "Plus" evaluations
     * These take precedence over single evals
     */

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
        evaluate(up, color, RULES, values[0], up.values[2])
    }
    if (CARD_RIGHT) {
        evaluate(right, color, RULES, values[1], right.values[3])
    }
    if (CARD_DOWN) {
        evaluate(down, color, RULES, values[2], down.values[0])
    }
    if (CARD_LEFT) {
        evaluate(left, color, RULES, values[3], left.values[1])
    }
}

export default battleProcessor
