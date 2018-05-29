const util = {

  // knuth shuffle (https://github.com/Daplie/knuth-shuffle)
  // returns a shuffled version of the array passed in
  shuffleArray(originalArray = []) {
    const array = originalArray.slice();
    let currentIndex = array.length;
    let randomIndex;
    let temp;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

};

export default util;