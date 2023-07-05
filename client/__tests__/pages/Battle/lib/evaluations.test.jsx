import { describe, test, expect } from 'vitest'
import { exportedForTesting } from '@pages/Battle/lib/logic/evaluations'

const IMG = "https://test.png"

// Colors
const RED = "#9e0e24"
const BLUE = "#03303b"
const INVALID_COLOR = "#ffffff"

// Bools
const TRUE = true
const FALSE = false
const NULL = null

// Card values
const ZEROS = [0, 0, 0, 0]
const FIVES = [5, 5, 5, 5]
const NINES = [9, 9, 9, 9]

// Base card values
const BASE_CARD = { "image": IMG, "captured": NULL }
const RED_BASE = { "color": RED }
const BLUE_BASE = { "color": BLUE }
const INVALID_BASE = { "color": INVALID_COLOR}

// Mock cards
const BLUE_CARD = () => (Object.assign({}, BASE_CARD, BLUE_BASE))
const RED_CARD = () => (Object.assign({}, BASE_CARD, RED_BASE))
const INVALID_CARD = () => (Object.assign({}, BASE_CARD, INVALID_BASE))

// Helpers
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

describe('Test evaluation functions', async () => {
    describe('isOpponent', () => {
        test.each([
            // Target is blue
            [BLUE_CARD(), RED, TRUE],
            [BLUE_CARD(), BLUE, FALSE],
            // Target is red
            [RED_CARD(), RED, FALSE],
            [RED_CARD(), BLUE, TRUE],
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
            [RED_CARD(), BLUE],
            [BLUE_CARD(), BLUE],
            [BLUE_CARD(), RED],
            [RED_CARD(), RED],
        ])('changes target card color if target != active card color', ( target, activeColor ) => {
            exportedForTesting.capture(target, activeColor)
            expect(target.color).to.eq(activeColor)
        })

        test.each([
            [RED_CARD(), BLUE_CARD(), TRUE],
            [BLUE_CARD(), BLUE_CARD(), TRUE],
            [BLUE_CARD(), RED_CARD(), TRUE],
            [RED_CARD(), RED_CARD(), TRUE],
        ])('sets captured prop to true', ( target, active, expected ) => {
            exportedForTesting.capture(target, active.color)
            expect(target.captured).toBe(expected)
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
            expect(target.captured).toBe(expected)
        })
    })

    describe('captureIfTrue', () => {
        test.each([
            [1 !== 1, RED_CARD(), BLUE, NULL],
            [1 === 1, RED_CARD(), BLUE, TRUE],
            [1 !== 1, BLUE_CARD(), RED, NULL],
            [1 === 1, BLUE_CARD(), RED, TRUE],
        ])('executes capture if evaluation is true', ( evaluation, target, activeColor, isCaptured ) => {
            exportedForTesting.captureIfTrue(evaluation, target, activeColor)
            expect(target.captured).toBe(isCaptured)
        })
    })

    describe('captureIfOpponent', () => {
        test.each([
            // Active card is blue
            [RED_CARD(), BLUE, TRUE],
            [BLUE_CARD(), BLUE, NULL],
            // Active card is red
            [BLUE_CARD(), RED, TRUE],
            [RED_CARD(), RED, NULL],
        ])('executes capture if target is opponent', ( target, activeColor, expected ) => {
            exportedForTesting.captureIfOpponent(target, activeColor)
            // It seems the internal capture fn call cannot be mocked/spied on
            // therefore, we rely on the captured property to asses behavior
            expect(target.captured).toBe(expected)
        })
    })

    describe('captureOpponentCardsIfTrue', () => {
        // Returns array of n mockCards
        const cardFactory = (n, mockCard) => {
            let cards = []
            for (let i = 1; i <= n; i++) {
                cards.push(mockCard)
            }
            return cards
        }

        test.each([
            [cardFactory(1, BLUE_CARD()), RED],
            [cardFactory(4, BLUE_CARD()), RED],
            [cardFactory(1, RED_CARD()), BLUE],
            [cardFactory(4, RED_CARD()), BLUE],
        ])('executes capture when all targets are opponent', ( targets, activeColor ) => {
            exportedForTesting.captureOpponentCardsIfTrue(TRUE, targets, activeColor)

            // Should capture and change color
            checkCapturedAndColors(targets, Array(5).fill(TRUE), Array(5).fill(activeColor))
        })

        test.each([
            [1 !== 1, cardFactory(4, BLUE_CARD()), RED],
            [1 !== 1, cardFactory(4, RED_CARD()), BLUE],
        ])('does not execute capture when false', ( isTrue, targets, activeColor ) => {
            exportedForTesting.captureOpponentCardsIfTrue(isTrue, targets, activeColor)

            // Should neither capture nor change color
            checkCapturedAndColors(targets, Array(5).fill(NULL), Array(5).fill(opponentColor(activeColor)))
        })

        test.each([
            [1 === 1, cardFactory(4, BLUE_CARD()), BLUE],
            [1 === 1, cardFactory(4, RED_CARD()), RED],
        ])('does not execute capture when all cards match activeColor', ( isTrue, targets, activeColor ) => {
            exportedForTesting.captureOpponentCardsIfTrue(isTrue, targets, activeColor)

            // Should not capture but maintain activeColor
            checkCapturedAndColors(targets, Array(5).fill(NULL), Array(5).fill(activeColor))
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
            checkCapturedAndColors(targets, expected, Array(5).fill(activeColor))
        })
    })
})
