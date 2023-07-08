
import { evaluate, evaluateSameAndPlus } from './evaluations'

// TMP config rules here
// Remove once battleProcessor accepts rules as an arg
let rules = {
    standard: true,
    low: false,
    same: false,
    plus: false
}

/**
 * @notice Process integer evaluations between opposing cards that are touching
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
    // e.g. cardUP means the target is above the active card
    const cardUP = up?._id
    const cardRight = !rightColumn.includes(index) && right?._id
    const cardDown = down?._id
    const cardLeft = !leftColumn.includes(index) && left?._id

    /**
     * "Same" and "Plus" evaluations
     * These take precedence over single evals
     */

    if (rules.same || rules.plus) {
        if (cardUP && cardRight) {
            evaluateSameAndPlus(up, right, color, rules, [values[0], values[1]], [up.values[2], right.values[3]])
        }

        if (cardUP && cardDown) {
            evaluateSameAndPlus(up, down, color, rules, [values[0], values[2]], [up.values[2], down.values[0]])
        }

        if (cardUP && cardLeft) {
            evaluateSameAndPlus(up, left, color, rules, [values[0], values[3]], [up.values[2], left.values[1]])
        }

        if (cardRight && cardDown) {
            evaluateSameAndPlus(right, down, color, rules, [values[1], values[2]], [right.values[3], down.values[0]])
        }

        if (cardRight && cardLeft) {
            evaluateSameAndPlus(right, left, color, rules, [values[1], values[3]], [right.values[3], left.values[1]])
        }

        if (cardDown && cardLeft) {
            evaluateSameAndPlus(down, left, color, rules, [values[2], values[3]], [down.values[0], left.values[1]])
        }
    }

    //
    // Single evaluations
    //

    if (cardUP) {
        evaluate(up, color, rules, values[0], up.values[2])
    }
    if (cardRight) {
        evaluate(right, color, rules, values[1], right.values[3])
    }
    if (cardDown) {
        evaluate(down, color, rules, values[2], down.values[0])
    }
    if (cardLeft) {
        evaluate(left, color, rules, values[3], left.values[1])
    }
}

export default battleProcessor
