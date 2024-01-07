import words from '../data/words.json';

const map = (
    value: number,
    min1: number,
    max1: number,
    min2: number,
    max2: number,
) => {
    return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
}

// generateWord function based on following rules:
// \boldsymbol{word_{i} =: map(avgT, minT, maxT, hardestWord, easiestWord)}
// \boldsymbol{avgT =: \frac{\sum_{}^{solvedLevels}time*complexityFactor}{solvedLevels}}
// \boldsymbol{complexityFactor_{i} =: map(word_{i}, easiestWord, hardestWord, 0, 1)}
// \boldsymbol{easiestWord =: 0}
// \boldsymbol{hardestWord =: DictionnarySize}
// \boldsymbol{minT =: 0}
// \boldsymbol{maxT =: 60}
export default function generateWord(gameState: any, level: number) {
    if (level === 1) {
        return words[map(Math.random(), 0, 1, 0, 30)];
    }
    const finishedTimeList = gameState.levels.splice(0, level).forEach((currLevel: any) => {
        return currLevel.finishtime * map(words.indexOf(currLevel.word), 0, words.length, 0, 1);
    });
    const avgTime = finishedTimeList.reduce((a: number, b: number) => a + b) / finishedTimeList.length;
    const wordIndex = map(avgTime, 0, 60, 0, words.length);
    return words[wordIndex];
};