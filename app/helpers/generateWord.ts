import words from '../data/words.json';

const map = (
    value: number,
    min1: number,
    max1: number,
    min2: number,
    max2: number,
) => {
    return parseInt(String(((value - min1) * (max2 - min2)) / (max1 - min1) + min2));
}

const mapFloat = (
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
        return words[0];
    }
    const finishedTimeList = gameState.levels.slice(0, level - 1).map((currLevel: any) => {
        return currLevel.finishtime;
    });
    let avgTime = finishedTimeList[0];
    if (finishedTimeList.length > 1)
        avgTime = finishedTimeList.reduce((a: number, b: number) => a + b) / finishedTimeList.length;
    const wordIndex = map(avgTime, 60, 0, 0, words.length);
    console.log(finishedTimeList, wordIndex, avgTime)
    return words[wordIndex];
};