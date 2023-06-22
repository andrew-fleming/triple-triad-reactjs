//// TMP Rulesets
const standard = "standard"
const low = "low"
const same = "same"
const plus = "plus"


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
    // "Same" evaluations ("plus" forthcoming)
    // These take precedence over single evals
    //

    if (CARD_UP && CARD_RIGHT) {
        evaluateSame(up, right, color, [up.values[2], right.values[3]], [values[0], values[1]])
    }

    if (CARD_UP && CARD_DOWN) {
        evaluateSame(up, down, color, [up.values[2], down.values[0]], [values[0], values[2]])
    }

    if (CARD_UP && CARD_LEFT) {
        evaluateSame(up, left, color, [up.values[2], left.values[1]], [values[0], values[3]])
    }

    if (CARD_RIGHT && CARD_DOWN) {
        evaluateSame(right, down, color, [right.values[3], down.values[0]], [values[1], values[2]])
    }

    if (CARD_RIGHT && CARD_LEFT) {
        evaluateSame(right, left, color, [right.values[3], left.values[1]], [values[1], values[3]])
    }

    if (CARD_DOWN && CARD_LEFT) {
        evaluateSame(down, left, color, [down.values[0], left.values[1]], [values[2], values[3]])
    }

    //
    // Single evaluations
    //

    if (CARD_UP) {
        evaluate(up, color, standard, up.values[2], values[0])
    }
    if (CARD_RIGHT) {
        evaluate(right, color, standard, right.values[3], values[1])
    }
    if (CARD_DOWN) {
        evaluate(down, color, standard, down.values[0], values[2])
    }
    if (CARD_LEFT) {
        evaluate(left, color, standard, left.values[1], values[3])
    }
}

const evaluate = (dir, color, ruleset, v1, v2) => {
    const isLt = v1 < v2
    const isGt = v1 > v2

    if (isOpponent(dir, color)) {
        if (ruleset === standard) {
            captureIfTrue(isLt, dir, color)
        } else if (ruleset === low) {
            captureIfTrue(isGt, dir, color)
        }
    }
}

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

const evaluateSame = (dir1, dir2, color, arr1, arr2) => {
    const isSame = arr1.toString() == arr2.toString() // TMP until normalized values

    if (isSame) {
        captureIfOpponent(dir1, color)
        captureIfOpponent(dir2, color)
    }
}

export default processStandardBattles
