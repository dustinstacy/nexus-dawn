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

const isOpponent = (dir, color) => {
    return dir.color !== color
}

const capture = (dir, color) => {
    dir.color = color
    dir.captured = !dir.captured
}

const captureIfTrue = (res, dir, color) => {
    if (res) {
        capture(dir, color)
    }
}

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
    captureIfOpponent
}
