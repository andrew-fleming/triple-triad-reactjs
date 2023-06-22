// Utils

// TMP Rulesets
const standard = "standard"
const low = "low"
const same = "same"
const plus = "plus"

export const evaluate = (dir, color, ruleset, v1, v2) => {
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

export const evaluateSame = (dir1, dir2, color, arr1, arr2) => {
    const isSame = arr1.toString() == arr2.toString() // TMP until normalized values

    if (isSame) {
        captureIfOpponent(dir1, color)
        captureIfOpponent(dir2, color)
    }
}

export const exportedForTesting = {
    isOpponent,
    capture,
    captureIfTrue,
    captureIfOpponent
}