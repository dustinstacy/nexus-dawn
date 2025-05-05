interface Rules {
	standard: boolean
	low: boolean
	same: boolean
	plus: boolean
}

/**
 * @notice Evaluates single (1-1) card values between active card and target card
 * @param {object} target - adjacent card that the active card's value will be evaluated against
 * @param {string} color - color of the active player (red or blue)
 * @param {dict} ruleset - (TMP) dictionary with information regarding current game rules
 * @param {number} aVal - active player's card value adjacent to target card's value
 * @param {number} tVal - target card's value adjacent to active player card's value
 */
export const evaluate = (
	target: object,
	color: string,
	ruleset: Rules,
	aVal: number,
	tVal: number
) => {
	const isGT = aVal > tVal
	const isLT = aVal < tVal

	if (isOpponent(target, color)) {
		if (ruleset.standard) {
			if (ruleset.low) {
				throw new Error('Evaluations: rules cannot be both standard and low')
			}
			captureIfTrue(isGT, target, color)
		} else if (ruleset.low) {
			captureIfTrue(isLT, target, color)
		}
	}
}

/**
 * @notice Evaluates dual card values between active player and opposing player. Specifically,
 * this checks for instances of "same" and/or "plus".
 * @notice "Same" occurs when two (or more) of the active player's card values exactly matches
 * the values of which they're facing e.g. (2:2, 8:8, 1:1, etc.)
 * @notice "Plus" occurs when the sum of one of its values with the value it's facing equals
 * the sum of another direction's values with the value it's facing.
 * @todo: add visuals to help explain all rules in MD files
 * @param {object} target1 - adjacent card that the active card's value will be evaluated against
 * @param {object} target2 - the second adjacent card that the active card's value will be evaluated against
 * @param {string} color - color of the active player (red or blue)
 * @param {dict} ruleset - (TMP) dictionary with information regarding current game rules
 * @param {Array} aVals - Two-element array of the indexed card values belonging to the active player
 * @param {Array} tVals - Two-element array of the indexed card values belonging to the target player
 *                        of which the active player's cards will be evaluated against
 */
export const evaluateSameAndPlus = (
	target1: object,
	target2: object,
	color: string,
	ruleset: Rules,
	aVals: Array<number>,
	tVals: Array<number>
) => {
	const isSame = aVals.toString() == tVals.toString()
	const isPlus = [aVals[0] + tVals[0]].toString() == [aVals[1] + tVals[1]].toString()

	if (ruleset.plus) {
		captureOpponentCardsIfTrue(isPlus, [target1, target2], color)
	}

	if (ruleset.same) {
		captureOpponentCardsIfTrue(isSame, [target1, target2], color)
	}
}

//
// Internals
//

// Returns true if the `target`.color != `color`
// Expects `target`.color and `color` to either be red or blue
const isOpponent = (target: any, color: string) => {
	return target.color !== color
}

// Changes the `color` of the `target` and updates the `target`'s capatured property
const capture = (target: any, color: string) => {
	target.color = color
	target.captured = !target.captured
}

// Captures if `evaluation` is true
const captureIfTrue = (evaluation: boolean, target: any, color: string) => {
	if (evaluation) {
		capture(target, color)
	}
}

// Captures if and only if `target`.color != `color`
const captureIfOpponent = (target: object, color: string) => {
	if (isOpponent(target, color)) {
		capture(target, color)
	}
}

// If `isTrue`, `targets` not matching `color` will be captured
const captureOpponentCardsIfTrue = (isTrue: boolean, targets: Array<any>, color: string) => {
	if (isTrue) {
		for (let i = 0; i < targets.length; i++) {
			captureIfOpponent(targets[i], color)
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
