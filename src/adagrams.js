const Adagrams = {
  drawLetters() {
    // return an array of 10 strings
    // nondestructive (letter pool cannot be altered)
    let letterPool = this.buildLetterPool();
    function shuffle (array) {
      let i = 0
        , j = 0
        , temp = null
      for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    }
    return shuffle((letterPool).slice()).slice(0,10);
  },
  usesAvailableLetters(input, lettersInHand) {
    // input is a string - an input word
    // lettersInHand is an array of drawn letters (10 strings)
    // returns true or false

    // edge: input = ''

    if (input.length > 10) {
      return false;
    }

    const hashTheHand = () => {
      let handHash = {};
      lettersInHand.forEach(letter => {
        handHash[letter] ? handHash[letter] += 1 : handHash[letter] = 1;
      });
      return handHash;
    }

    let hand = hashTheHand();
    input = input.toUpperCase().split('');
    //
    // console.log(lettersInHand);
    // console.log(hand);
    // console.log(input);

    let failures = 0;

    input.forEach(char => {
      // console.log(hand[char] == undefined);
      if ( !hand[char] || hand[char] < 1) {
        failures += 1;
      }
      hand[char] -= 1;
    });
    return (failures == 0 ? true : false)
    // return true
  },
  scoreWord(word) {
    // word is a string of characters
    // return an integer (points)
    let scoringWord = word.toUpperCase().split('');
    let totalPoints = 0;

    // Each letter has a point value
    let scoreChart = this.scoreChart;
    scoringWord.forEach(char => {
      totalPoints += scoreChart[char];
    });

    // If the length of the word is 7, 8, 9, or 10, then the word gets an additional 8 points
    let plusEightWordLengths = [7,8,9,10];
    totalPoints += (plusEightWordLengths.includes(scoringWord.length) ? 8 : 0)

    return totalPoints
  },
  highestScoreFrom(words) {
    // words is an array of strings
    // return a single hash with data of winning word and score
        // word: ${string of word}
        // score: ${score of the word}
  },
  isInEnglishDict(input) {
    // input is a string
    // returns true or false

    // https://github.com/dwyl/english-words
  },
  buildLetterPool() {
    const alphabetHash = {
      A: 9,
      B: 2,
      C: 2,
      D: 4,
      E: 12,
      F: 2,
      G: 3,
      H: 2,
      I: 9,
      J: 1,
      K: 1,
      L: 4,
      M: 2,
      N: 6,
      O: 8,
      P: 2,
      Q: 1,
      R: 6,
      S: 4,
      T: 6,
      U: 4,
      V: 2,
      W: 2,
      X: 1,
      Y: 2,
      Z: 1
    }
    const letterPool = [];
    for (let [letter, frequency] of Object.entries(alphabetHash)) {
      // while (frequency > 0) {
      let i = frequency;
      for (i; i > 0; i -= 1) {
        letterPool.push(letter);
      }
    }
    return letterPool
  },
  scoreChart: {
        A: 1,
        B: 3,
        C: 3,
        D: 2,
        E: 1,
        F: 4,
        G: 2,
        H: 4,
        I: 1,
        J: 8,
        K: 5,
        L: 1,
        M: 3,
        N: 1,
        O: 1,
        P: 3,
        Q: 10,
        R: 1,
        S: 1,
        T: 1,
        U: 1,
        V: 4,
        W: 4,
        X: 8,
        Y: 4,
        Z: 10
      },
};

  // console.log(Adagrams.usesAvailableLetters('woohhhhx', ['W', 'O', 'O', 'H', 'H']))
  // console.log(Adagrams.scoreWord())

// Do not remove this line or your tests will break!
export default Adagrams;
