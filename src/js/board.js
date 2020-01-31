export default class Board {
  constructor() {
    this.boardSize = 4;
    this.cellIndexes = this.generateBoard();
  }

  generateBoard() {
    const arr = [];
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      arr.push(i);
    }
    return arr;
  }

  drawBoard() {
    this.boardContainer = document.querySelector('.board-container');

    const cellsHTML = this.cellIndexes.map((index) => `<div class="cell" data-id="${index}"></div>`);

    cellsHTML.forEach((element) => {
      this.boardContainer.insertAdjacentHTML('beforeEnd', element);
    });

    this.cells = Array.from(document.getElementsByClassName('cell'));
  }

  placeGoblin() {
    let allowedIndexes;
    const goblinImage = document.querySelector('.goblin');
    if (goblinImage) {
      allowedIndexes = this.cellIndexes.filter((item) => item !== Number(this.position));
      goblinImage.classList.remove('goblin');
    } else {
      allowedIndexes = this.cellIndexes;
    }
    const randIndex = allowedIndexes[Math.floor(Math.random() * allowedIndexes.length)];
    const randCell = this.cells.filter((element) => Number(element.dataset.id) === randIndex)[0];

    randCell.classList.add('goblin');
    this.position = randCell.dataset.id;
  }

  start() {
    setInterval(() => this.placeGoblin(), 1000);
  }
}
