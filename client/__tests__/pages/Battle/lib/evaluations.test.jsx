import React from 'react'
import { describe, it, vi, expect, beforeEach } from 'vitest'
import { exportedForTesting } from '@pages/Battle/lib/logic/evaluations'

let redCard = "red"
let blueCard = "blue"
let player = {
    "color": ""
}

describe('isOpponent', () => {
    describe('when the player is red', () => {
        beforeEach(() => {
            player.color = "red"
        })
        it('is an opponent', () => {
            expect(exportedForTesting.isOpponent(player, blueCard)).to.eq(true)
        })
        it('is not an opponent', () => {
            expect(exportedForTesting.isOpponent(player, redCard)).to.eq(false)
        })
    })

    describe('when the player is blue', () => {
        beforeEach(() => {
            player.color = "blue"
        })
        it('is an opponent', () => {
            expect(exportedForTesting.isOpponent(player, redCard)).to.eq(true)
        })
        it('is not an opponent', () => {
            expect(exportedForTesting.isOpponent(player, blueCard)).to.eq(false)
        })
    })
})