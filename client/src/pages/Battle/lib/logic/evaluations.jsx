/**
 * Evaluates single (1-1) card values between active player and opponent
 * @param {object} dir - direction of active card relative to opponent card
 * @param {string} color - color of the active player (red or blue)
 * @param {dict} ruleset - (TMP) dictionary with information regarding current game rules
 * @param {number} v1 - active player's card value adjacent to opponent's card value
 * @param {number} v2 - opponent's card value adjacent to active player's card value
 */
export const evaluate = (dir, color, ruleset, v1, v2) => {
    const isLt = v1 < v2
    const isGt = v1 > v2

    if (isOpponent(dir, color)) {
        if (ruleset.standard) {
            captureIfTrue(isLt, dir, color)
        } else if (ruleset.low) {
            captureIfTrue(isGt, dir, color)
        }
    }
}

/**
 * Evaluates dual card values between active player and opponent. Specifically,
 * this checks for instances of "same" and/or "plus".
 * "Same" occurs when two (or more) of the active player's card values exactly matches
 * the values of which they're facing e.g. (2:2, 8:8, 1:1, etc.)
 * "Plus" occurs when the sum of one of its values with the value it's facing equals
 * the sum of another direction's values with the value it's facing.
 * TODO: add visuals to help explain all rules in MD files
 * @param {object} dir1 - direction of active card relative to opponent card
 * @param {object} dir2 - second direction of active card relative to opponent card
 * @param {string} color - color of the active player (red or blue)
 * @param {dict} ruleset - (TMP) dictionary with information regarding current game rules
 * @param {Array} p1 - Two-element array of the indexed card values to evaluate against the opponent
 * @param {Array} p2 - Two-element array of the indexed card values of which the active player's
 *                     cards will be evaluated against
 */
export const evaluateSameAndPlus = (dir1, dir2, color, ruleset, p1, p2) => {
    const isSame = p1.toString() == p2.toString()
    const isPlus = [p1[0] + p2[0]].toString() == [p1[1] + p2[1]].toString()

    if (ruleset.plus) {
        captureOpponentCardsIfTrue(isPlus, [dir1, dir2], color)
    }

    if (ruleset.same) {
        captureOpponentCardsIfTrue(isSame, [dir1, dir2], color)
    }
}

//
// Helper functions
//

// Returns true if the relative direction (dir) is facing another color
// Expects dir.color and color to either be red or blue
const isOpponent = (dir, color) => {
    return dir.color !== color
}

// Changes the color of the target
const capture = (dir, color) => {
    dir.color = color
    dir.captured = !dir.captured
}

// Captures if 'res' is true
const captureIfTrue = (res, dir, color) => {
    if (res) {
        capture(dir, color)
    }
}

// Captures if and only if the target is not the same color as the active player
const captureIfOpponent = (dir, color) => {
    if (isOpponent(dir, color)) {
        capture(dir, color)
    }
}

// If isTrue condition, passed opponent directions will be captured
const captureOpponentCardsIfTrue = (isTrue, directions, color) => {
    if (isTrue) {
        for (let i = 0; i < directions.length; i++) {
            captureIfOpponent(directions[i], color)
        }
    }
}

export const exportedForTesting = {
    isOpponent,
    capture,
    captureIfTrue,
    captureIfOpponent,
    captureOpponentCardsIfTrue
}
