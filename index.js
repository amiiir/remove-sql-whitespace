let removeSqlWhitespace = text => {
    let updates = [...text.matchAll(/(?<=execute)\(/g)]
        .map(m => m.index)
        .map(i => {
            let prCount = 1
            let j = i + 1
            while (prCount > 0 && j < text.length) {
                if (text[j] === '(') prCount += 1
                else if (text[j] === ')') prCount -= 1
                j += 1
            }
            return { from: i + 1, to: j - 1, value: text.slice(i + 1, j - 1).replace(/(\s|\\n|\\t)+/g, ' ') }
        })
    let parts = []
    let prev = 0
    for (let update of updates) {
        parts = [...parts, text.slice(prev, update.from), update.value]
        prev = update.to
    }
    parts = [...parts, text.slice(prev)]
    return parts.join('')
}

module.exports = removeSqlWhitespace
