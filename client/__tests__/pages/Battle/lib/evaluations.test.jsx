import { describe, test, expect } from 'vitest'
import { evaluate, evaluateSameAndPlus, exportedForTesting } from '@pages/Battle/lib/logic/evaluations'

//
// Constants
//

const IMG = "https://test.png"

// Colors
const RED = "#9e0e24"
const BLUE = "#03303b"
const INVALID_COLOR = "#ffffff"

// Bools
const TRUE = true
const FALSE = false
const NULL = null

// Single value battles
const WIN = [6, 5]
const LOSE = [5, 6]
const DRAW = [5, 5]
const LOW_WIN = LOSE
const LOW_LOSE = WIN

//
// Mock rules
//

// Base
const BASE_RULES = {
    standard: false,
    low: false,
    same: false,
    plus: false
}

// Single value rules
const RULES_NONE = BASE_RULES
const RULES_STD = () => (Object.assign({}, BASE_RULES, { "standard": true }))
const RULES_LOW = () => (Object.assign({}, BASE_RULES, { "low": true }))
const RULES_STD_LOW = () => (Object.assign({}, BASE_RULES, {"standard": true, "low": true }))

// Multi value rules
const RULES_SAME = (Object.assign({}, RULES_STD(), { "same": true }))
const RULES_PLUS = (Object.assign({}, RULES_STD(), { "plus": true }))
const RULES_SAME_PLUS = (Object.assign({}, RULES_STD(), { "same": true, "plus": true }))
const RULES_LOW_SAME = (Object.assign({}, RULES_LOW(), { "same": true }))
const RULES_LOW_PLUS = (Object.assign({}, RULES_LOW(), { "plus": true }))
const RULES_LOW_SAME_PLUS = (Object.assign({}, RULES_LOW(), { "same": true, "plus": true }))

//
// Mock Cards
//

// Base card values
const BASE_CARD = { "image": IMG, "captured": NULL }
const RED_BASE = { "color": RED }
const BLUE_BASE = { "color": BLUE }
const INVALID_BASE = { "color": INVALID_COLOR }

// Cards (no values)
const BLUE_CARD = () => (Object.assign({}, BASE_CARD, BLUE_BASE))
const RED_CARD = () => (Object.assign({}, BASE_CARD, RED_BASE))
const INVALID_CARD = () => (Object.assign({}, BASE_CARD, INVALID_BASE))

//
// Helpers
//

const opponentColor = (color) => {
    if (color !== RED && color !== BLUE) {
        throw new Error(color + ' is invalid');
    }
    return color === RED ? BLUE : RED
}

const checkCapturedAndColors = (targets, isCaptured, activeColor) => {
    for (let i = 0; i < targets.length; i++) {
        // Check captured
        expect(targets[i].captured).toBe(isCaptured[i])
        //Check color
        expect(targets[i].color).to.eq(activeColor[i])
    }
}

const checkCapturedAndColorsSingle = (target, isCaptured, activeColor) => {
    checkCapturedAndColors([target], [isCaptured], [activeColor])
}

// Return array of n mockCards
const cardFactory = (n, mockCard) => {
    let cards = []
    for (let i = 1; i <= n; i++) {
        cards.push(mockCard)
    }
    return cards
}

describe('Test evaluation functions', async () => {
    describe('evaluate', () => {
        describe('with standard rules', () => {
            test.each([
                [RED_CARD(), BLUE, WIN, [BLUE, TRUE]],
                [RED_CARD(), BLUE, LOSE, [RED, NULL]],
                [RED_CARD(), BLUE, DRAW, [RED, NULL]],
                [RED_CARD(), RED, WIN, [RED, NULL]],
                [RED_CARD(), RED, LOSE, [RED, NULL]],
                [RED_CARD(), RED, DRAW, [RED, NULL]],
            ])('evaluate card values during battle', ( target, activeColor, result, expected ) => {
                evaluate(target, activeColor, RULES_STD(), ...result)
                expect(target.color).to.eq(expected[0])
                expect(target.captured).toBe(expected[1])
            })
        })

        describe('with low rules', () => {
            test.each([
                [RED_CARD(), BLUE, LOW_WIN, [BLUE, TRUE]],
                [RED_CARD(), BLUE, LOW_LOSE, [RED, NULL]],
                [RED_CARD(), BLUE, DRAW, [RED, NULL]],
                [RED_CARD(), RED, LOW_WIN, [RED, NULL]],
                [RED_CARD(), RED, LOW_LOSE, [RED, NULL]],
                [RED_CARD(), RED, DRAW, [RED, NULL]],
            ])('evaluate card values during battle', ( target, activeColor, result, expected ) => {
                evaluate(target, activeColor, RULES_LOW(), ...result)

                expect(target.color).to.eq(expected[0])
                expect(target.captured).toBe(expected[1])
            })
        })

        describe('with standard and low rules', () => {
            test.each([
                [RED_CARD(), BLUE, WIN],
                [RED_CARD(), BLUE, LOSE],
                [RED_CARD(), BLUE, DRAW],
                [BLUE_CARD(), BLUE, WIN],
                [BLUE_CARD(), BLUE, LOSE],
                [BLUE_CARD(), BLUE, DRAW],
            ])('battles with nonmatching cards should throw', ( target, activeColor, result ) => {
                // If colors match, execution stops and does not reach the throw statement
                if (target.color === activeColor) {
                    evaluate(target, activeColor, RULES_STD_LOW(), ...result)
                    expect(target.captured).toBe(NULL)
                } else {
                expect(() => evaluate(target, activeColor, RULES_STD_LOW(), ...result)).toThrowError(
                    /^evaluations: rules cannot be both stanard and low$/,
                  )
                }
            })
        })

        describe('with no rules', () => {
            test.each([
                [RED_CARD(), BLUE, WIN, [RED, NULL]],
                [RED_CARD(), BLUE, LOSE, [RED, NULL]],
                [RED_CARD(), BLUE, DRAW, [RED, NULL]],
                [RED_CARD(), RED, WIN, [RED, NULL]],
                [RED_CARD(), RED, LOSE, [RED, NULL]],
                [RED_CARD(), RED, DRAW, [RED, NULL]],
            ])('battles result in no state changes', ( target, activeColor, result, expected ) => {
                evaluate(target, activeColor, RULES_NONE, ...result)

                expect(target.color).to.eq(expected[0])
                expect(target.captured).toBe(expected[1])
            })
        })
    })

    describe('evaluateSameAndPlus', () => {
        describe('with "same" rules', () => {
            describe.each([
                { rules: RULES_SAME, toString: "standard" },
                { rules: RULES_LOW_SAME, toString: "low" },
              ])('with $toString rules', ({ rules }) => {
                test.each([
                    [[RED_CARD(), RED_CARD()], rules, [0, 0], [0, 0], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [1, 2], [1, 2], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [123, 45], [123, 45], [TRUE, TRUE]],
                ])('captures two opponent cards when "same" condition is true', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(BLUE))
                })

                test.each([
                    [[RED_CARD(), BLUE_CARD()], rules, [0, 0], [0, 0], [TRUE, NULL]],
                    [[BLUE_CARD(), RED_CARD()], rules, [0, 0], [0, 0], [NULL, TRUE]],
                ])('captures one opponent card when "same" condition is true', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(BLUE))
                })

                test.each([
                    [[BLUE_CARD(), BLUE_CARD()], rules, [0, 0], [0, 0], [NULL, NULL]],
                ])('captures no opponent cards when "same" condition is true', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(BLUE))
                })

                test.each([
                    [[RED_CARD(), RED_CARD()], rules, [0, 1], [2, 3], [NULL, NULL]],
                    [[RED_CARD(), RED_CARD()], rules, [123, 456], [123, 789], [NULL, NULL]],
                    [[RED_CARD(), RED_CARD()], rules, [123, 456], [789, 456], [NULL, NULL]],
                ])('does not capture when "same" condition is false', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(opponentColor(BLUE)))
                })
            })
        })

        describe('with "plus" rules', () => {
            describe.each([
                { rules: RULES_PLUS, toString: "standard" },
                { rules: RULES_LOW_PLUS, toString: "low" },
              ])('with $toString rules', ({ rules }) => {
                test.each([
                    [[RED_CARD(), RED_CARD()], rules, [0, 0], [0, 0], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [9, 5], [0, 4], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [999, 499], [1, 501], [TRUE, TRUE]],
                ])('captures two opponent cards when "plus" condition is true', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(BLUE))
                })

                test.each([
                    [[RED_CARD(), BLUE_CARD()], rules, [1, 2], [3, 2], [TRUE, NULL]],
                    [[BLUE_CARD(), RED_CARD()], rules, [7, 8], [5, 4], [NULL, TRUE]],
                ])('captures one opponent card when "plus" condition is true ', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(BLUE))
                })

                test.each([
                    [[BLUE_CARD(), BLUE_CARD()], rules, [2, 4], [3, 1], [NULL, NULL]],
                ])('captures no opponent cards when "plus" condition is true', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(BLUE))
                })

                test.each([
                    [[RED_CARD(), RED_CARD()], rules, [0, 1], [2, 3], [NULL, NULL]],
                    [[RED_CARD(), RED_CARD()], rules, [123, 456], [123, 789], [NULL, NULL]],
                    [[RED_CARD(), RED_CARD()], rules, [123, 456], [456, 987], [NULL, NULL]],
                ])('does not capture when "plus" condition is false', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(opponentColor(BLUE)))
                })
            })
        })

        describe('with "same" and "plus" rules', () => {
            describe.each([
                { rules: RULES_SAME_PLUS, toString: "standard" },
                { rules: RULES_LOW_SAME_PLUS, toString: "low" },
              ])('with $toString rules', ({ rules, }) => {
                test.each([
                    // Same and plus
                    [[RED_CARD(), RED_CARD()], rules, [0, 0], [0, 0], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [3, 3], [3, 3], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [999, 999], [999, 999], [TRUE, TRUE]],

                    // Same
                    [[RED_CARD(), RED_CARD()], rules, [1, 2], [1, 2], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [9, 5], [9, 5], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [999, 555], [999, 555], [TRUE, TRUE]],

                    // Plus
                    [[RED_CARD(), RED_CARD()], rules, [2, 1], [1, 2], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [9, 5], [0, 4], [TRUE, TRUE]],
                    [[RED_CARD(), RED_CARD()], rules, [999, 499], [1, 501], [TRUE, TRUE]],
                ])('captures two opponent cards when "same" and/or "plus" condition is true', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(BLUE))
                })

                test.each([
                    // Same and plus
                    [[BLUE_CARD(), RED_CARD()], rules, [0, 0], [0, 0], [NULL, TRUE]],
                    [[RED_CARD(), BLUE_CARD()], rules, [3, 3], [3, 3], [TRUE, NULL]],
                    [[BLUE_CARD(), RED_CARD()], rules, [999, 999], [999, 999], [NULL, TRUE]],

                    // Same
                    [[RED_CARD(), BLUE_CARD()], rules, [1, 2], [1, 2], [TRUE, NULL]],
                    [[BLUE_CARD(), RED_CARD()], rules, [9, 5], [9, 5], [NULL, TRUE]],
                    [[RED_CARD(), BLUE_CARD()], rules, [999, 555], [999, 555], [TRUE, NULL]],

                    // Plus
                    [[BLUE_CARD(), RED_CARD()], rules, [2, 1], [1, 2], [NULL, TRUE]],
                    [[RED_CARD(), BLUE_CARD()], rules, [9, 5], [0, 4], [TRUE, NULL]],
                    [[BLUE_CARD(), RED_CARD()], rules, [999, 499], [1, 501], [NULL, TRUE]],
                ])('captures one opponent card when "same" and/or "plus" condition is true', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(BLUE))
                })

                test.each([
                    // Same and plus
                    [[BLUE_CARD(), BLUE_CARD()], rules, [0, 0], [0, 0], [NULL, NULL]],
                    [[BLUE_CARD(), BLUE_CARD()], rules, [3, 3], [3, 3], [NULL, NULL]],
                    [[BLUE_CARD(), BLUE_CARD()], rules, [999, 999], [999, 999], [NULL, NULL]],

                    // Same
                    [[BLUE_CARD(), BLUE_CARD()], rules, [1, 2], [1, 2], [NULL, NULL]],
                    [[BLUE_CARD(), BLUE_CARD()], rules, [9, 5], [9, 5], [NULL, NULL]],
                    [[BLUE_CARD(), BLUE_CARD()], rules, [999, 555], [999, 555], [NULL, NULL]],

                    // Plus
                    [[BLUE_CARD(), BLUE_CARD()], rules, [2, 1], [1, 2], [NULL, NULL]],
                    [[BLUE_CARD(), BLUE_CARD()], rules, [9, 5], [0, 4], [NULL, NULL]],
                    [[BLUE_CARD(), BLUE_CARD()], rules, [999, 499], [1, 501], [NULL, NULL]],
                ])('captures no opponent cards when "same" and/or "plus" condition is true', (targets, rules, aVals, pVals, expected) => {
                    evaluateSameAndPlus(targets[0], targets[1], BLUE, rules, aVals, pVals)
                    checkCapturedAndColors(targets, expected, Array(2).fill(BLUE))
                })
            })
        })
    })

    describe('isOpponent', () => {
        test.each([
            // Target is blue
            [BLUE_CARD(), RED, TRUE],
            [BLUE_CARD(), BLUE, FALSE],
            // Target is invalid
            [INVALID_CARD(), RED, TRUE],
            [INVALID_CARD(), BLUE, TRUE],
            // Active card color is invalid
            [BLUE_CARD(), INVALID_COLOR, TRUE],
            [RED_CARD(), INVALID_COLOR, TRUE],
        ])('returns whether the target card is an opponent card', (target, color, expected) => {
            expect(exportedForTesting.isOpponent(target, color)).toBe(expected)
        })
    })

    describe('capture', () => {
        test.each([
            [RED_CARD(), BLUE_CARD(), TRUE],
            [BLUE_CARD(), BLUE_CARD(), TRUE],
        ])('changes target card color if target != active card color', ( target, active, expected ) => {
            exportedForTesting.capture(target, active.color)
            checkCapturedAndColorsSingle(target, expected, active.color)
            // Sanity check ensuring active card does not change
            expect(active.captured).to.eq(NULL)
        })

        test.each([
            [RED_CARD(), BLUE_CARD(), 2, FALSE],
            [BLUE_CARD(), RED_CARD(), 3, TRUE],
        ])('multiple captures on target', ( target, active, nCaptures, expected ) => {
            for (let i = 1; i <= nCaptures; i++) exportedForTesting.capture(target, active.color);
            // 2 captures: T,F
            // 3 captures: T,F,T
            checkCapturedAndColorsSingle(target, expected, active.color)
        })
    })

    describe('captureIfTrue', () => {
        test.each([
            [1 !== 1, RED_CARD(), BLUE, NULL],
            [1 === 1, RED_CARD(), BLUE, TRUE],
        ])('executes capture if evaluation is true', ( evaluation, target, activeColor, isCaptured ) => {
            exportedForTesting.captureIfTrue(evaluation, target, activeColor)
            expect(target.captured).toBe(isCaptured)
        })
    })

    describe('captureIfOpponent', () => {
        test.each([
            [RED_CARD(), BLUE, TRUE],
            [BLUE_CARD(), BLUE, NULL],
        ])('executes capture if target is opponent', ( target, activeColor, expected ) => {
            exportedForTesting.captureIfOpponent(target, activeColor)
            expect(target.captured).toBe(expected)
        })
    })

    describe('captureOpponentCardsIfTrue', () => {
        test.each([
            [cardFactory(1, BLUE_CARD()), RED],
            [cardFactory(4, BLUE_CARD()), RED],
            [cardFactory(1, RED_CARD()), BLUE],
            [cardFactory(4, RED_CARD()), BLUE],
        ])('executes capture when all targets are opponent', ( targets, activeColor ) => {
            exportedForTesting.captureOpponentCardsIfTrue(TRUE, targets, activeColor)
            // Should capture and change color
            checkCapturedAndColors(targets, Array(4).fill(TRUE), Array(4).fill(activeColor))
        })

        test.each([
            [1 !== 1, cardFactory(4, BLUE_CARD()), RED],
            [1 !== 1, cardFactory(4, RED_CARD()), BLUE],
        ])('does not execute capture when false', ( isTrue, targets, activeColor ) => {
            exportedForTesting.captureOpponentCardsIfTrue(isTrue, targets, activeColor)
            // Should neither capture nor change color
            checkCapturedAndColors(targets, Array(4).fill(NULL), Array(4).fill(opponentColor(activeColor)))
        })

        test.each([
            [1 === 1, cardFactory(4, BLUE_CARD()), BLUE],
            [1 === 1, cardFactory(4, RED_CARD()), RED],
        ])('does not execute capture when all cards match activeColor', ( isTrue, targets, activeColor ) => {
            exportedForTesting.captureOpponentCardsIfTrue(isTrue, targets, activeColor)
            // Should not capture but maintain activeColor
            checkCapturedAndColors(targets, Array(4).fill(NULL), Array(4).fill(activeColor))
        })

        test.each([
            [
                [BLUE_CARD(), RED_CARD(), BLUE_CARD(), RED_CARD()],
                [NULL, TRUE, NULL, TRUE],
                BLUE
            ],
            [
                [BLUE_CARD(), RED_CARD(), BLUE_CARD(), RED_CARD()],
                [TRUE, NULL, TRUE, NULL],
                RED
            ],
        ])('executes capture on correct cards when mixed', ( targets, expected, activeColor ) => {
            exportedForTesting.captureOpponentCardsIfTrue(TRUE, targets, activeColor)
            checkCapturedAndColors(targets, expected, Array(4).fill(activeColor))
        })
    })
})
