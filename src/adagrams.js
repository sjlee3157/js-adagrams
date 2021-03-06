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
    if (input.length > lettersInHand.length) { return false }

    const objectifyTheHand = () => {
      let handObject = {};
      lettersInHand.forEach(letter => {
        handObject[letter] ? handObject[letter] += 1 : handObject[letter] = 1;
      });
      return handObject;
    }

    let hand = objectifyTheHand();
    input = input.toUpperCase().split('');

    let failures = 0;
    input.forEach(char => {
      if ( !hand[char] || hand[char] < 1) { failures += 1 }
      hand[char] -= 1;
    });
    return (failures == 0 ? true : false)
  },
  scoreWord(word) {
    // word is a string of characters
    // return an integer (points)
    let scoringWord = word.toUpperCase().split('');
    let totalPoints = 0;

    // Each letter has a point value
    let scoreChart = Adagrams.scoreChart;
    scoringWord.forEach(char => { totalPoints += scoreChart[char] });

    // If the length of the word is 7, 8, 9, or 10, then the word gets an additional 8 points
    let plusEightWordLengths = [7,8,9,10];
    totalPoints += (plusEightWordLengths.includes(scoringWord.length) ? 8 : 0)
    return totalPoints
  },
  highestScoreFrom(words) {
    // words is an array of strings
    // return a single object with data of winning word and score
        // word: string of word
        // score: score of the word
    const wordsData = words.map(word => {
      let wordObject = {}
      wordObject.word = word;
      wordObject.score = Adagrams.scoreWord(word);
      return wordObject;
    })

    // What is the highest score?
    let scores = wordsData.map(elm => elm.score)
    const highestScore = scores.reduce(function(a,b) { return Math.max(a, b)})

    // Is there >1 word with the highest score (a tie)? If not, return word.
    let tiedHighestScorers = wordsData.filter(elm => elm.score == highestScore);
    if (tiedHighestScorers.length == 1) { return tiedHighestScorers[0] }

    // Is there a word with length 10? If so, get the first word with length 10.
    let winningLengthTenWord = tiedHighestScorers.find(function(elm) {
      return elm.word.length == 10;
    });
    if (winningLengthTenWord) { return winningLengthTenWord }

    // What is the shortest word length? Get the first word with shortest word length.
    let lengths = wordsData.map(elm => elm.word.length)
    const shortestLength = lengths.reduce(function(a,b) {return Math.min(a, b)})
    let winningShortestWord = tiedHighestScorers.find(function(elm) {
      return elm.word.length == shortestLength;
    });
    return winningShortestWord;
  },
  isInEnglishDict(input) {
    // input is a string
    // returns true or false
    // https://github.com/dwyl/english-words
    let fs = require("fs");
    let dictionary = fs.readFileSync('assets/words_dictionary.json');
    let jsonContent = JSON.parse(dictionary);
    return (jsonContent[input] ? true : false)
  },
  buildLetterPool() {
    const alphabetObject = {
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
    for (let [letter, frequency] of Object.entries(alphabetObject)) {
      let i = frequency;
      for (i; i > 0; i -= 1) { letterPool.push(letter) }
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
  // console.log(Adagrams.isInEnglishDict('kkkkrrr'))
  // console.log(Adagrams.usesAvailableLetters('woohhhhx', ['W', 'O', 'O', 'H', 'H']))
  // console.log(Adagrams.highestScoreFrom(['apples', 'qqw', 'zzw', 'applesauce', 'melon']))

// Do not remove this line or your tests will break!
export default Adagrams;
