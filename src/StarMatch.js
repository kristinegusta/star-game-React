import React from 'react'
import NumberButton from './NumberButton';
import StarsDisplay from './StarsDisplay';
import PlayAgain from './PlayAgain';

const StarMatch = () => {
  const [stars, setStars] = React.useState(utils.random(1, 9));
  const [availableNum, setAvailableNum] = React.useState(utils.range(1, 9))
  const [candidateNum, setCandidateNum] = React.useState([])

  const onButtonClick = (number, currentStatus) => {
    if (currentStatus == "used") {
      return;
    }

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNum.concat(number)
        : candidateNum.filter(cn => cn !== number)
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNum(newCandidateNums)
    }

    else {
      const newAvailableNums = availableNum.filter(
        n => !newCandidateNums.includes(n)
      )
      setStars(utils.randomSumIn(newAvailableNums, 9))
      setAvailableNum(newAvailableNums)
      setCandidateNum([])
    }
  }

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNum(utils.range(1, 9));
    setCandidateNum([]);
  }

  const candidatesAreWrong = utils.sum(candidateNum) > stars;
  const gameIsDone = availableNum.length === 0

  const numberButtonStatus = (number) => {
    if (!availableNum.includes(number)) {
      return 'used';
    }
    if (candidateNum.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available'
  }


  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {
            gameIsDone ?
              (<PlayAgain onClick={resetGame} />)
              : (<StarsDisplay starCount={stars} />)
          }

        </div>
        <div className="right">
          {utils.range(1, 9).map(number =>
            <NumberButton
              key={number}
              number={number}
              status={numberButtonStatus(number)}
              onClick={onButtonClick}
            />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};



// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export { StarMatch, utils };