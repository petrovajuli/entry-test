const defaultPiecePosition = 'top: 0; left: 0;';
const successResult = 'success!';
const failResult = 'fail!';
const successModifier = 'result--success';
const start = document.querySelector('.start');
const result = document.querySelector('.result');
const fieldElement = document.querySelector('.field');
const cellsElements = document.querySelectorAll('.field__cell');
const pieceElement = document.querySelector('.piece');


class Field {
  constructor() {
    this.field = fieldElement;
    this.cells = cellsElements;
    this.opposites = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    }
  }

  wallThere(direction, classes) {
    return classes.indexOf(direction) !== -1;
  }

  inTheSameRow(current, next) {
    return (current - current % 10) / 10 === (next - next % 10) / 10
  }

  findNextCell(currentIndex, direction) {
    let nextIndex = currentIndex;

    switch (direction) {
      case 'up':
        nextIndex = currentIndex - 10;
        if (nextIndex < 0) {
          nextIndex = -1;
        }
        break;

      case 'right':
        nextIndex = currentIndex + 1;
        if (!this.inTheSameRow(currentIndex, nextIndex)) {
          nextIndex = -1;
        }
        break;

      case 'down':
        nextIndex = currentIndex + 10;
        if (nextIndex > 100) {
          nextIndex = -1;
        }
        break;

      case 'left':
        nextIndex = currentIndex - 1;
        if (!this.inTheSameRow(currentIndex, nextIndex)) {
          nextIndex = -1;
        }
        break;

      default:
        nextIndex = -1;
        break;
    }

    return this.cells[nextIndex];
  }

  checkCell(currentTop, currentLeft, direction) {
    let cellIndex = (currentTop / 50 * 10 + currentLeft / 50);
    let cell = this.cells[cellIndex];
    let nextCell = this.findNextCell(cellIndex, direction);

    return !(
      this.wallThere(direction, cell.classList.toString()) ||
      typeof nextCell === 'undefined' ||
      this.wallThere(this.opposites[direction], nextCell.classList.toString())
    );
  }
}

class Piece {
  constructor() {
    this.piece = pieceElement;
    this.steps = [];
    this.finished = false;
    this.timeout = 400;
    this.field = new Field();
  }

  addStep(direction) {
    this.steps.push({ direction })
  }

  makeNext(step, endAfterIt) {
    let top = Number(this.piece.style.top.replace('px', ''));
    let left = Number(this.piece.style.left.replace('px', ''));
    let nextLeft = left;
    let nextTop = top;


    switch (step.direction) {
      case 'left':
        // added offset
        nextLeft -= 50;
        break;

      case 'down':
        nextTop += 50;
        break;

      case 'up':
        //added offset
        nextTop -= 50;
        break;

      case 'right':
        nextLeft += 50;
        break;

      default:
        return;
    }

    if (this.finished) {
      return;
    }

    if (this.field.checkCell(top, left, step.direction)) {

      this.piece.setAttribute('style', 'top: ' + nextTop + 'px; left: ' + nextLeft + 'px;');

      if (nextTop === 450 && nextLeft === 0) {
        this.finished = true;
      }

      if (this.finished) {
        this.end(true);
      }
    }

    if (!this.finished && endAfterIt) {
      this.end(false);
    }
  }

  end(success) {
    if (success) {
      result.textContent = successResult;
      result.classList.add(successModifier);
    } else {
      result.textContent = failResult;
      result.classList.remove(successModifier);
    }
  }

  go() {
    this.steps.forEach((step, index) => {
      setTimeout(() => {
        const endAfterIt = index === this.steps.length - 1;
        this.makeNext(step, endAfterIt);
      }, (index + 1) * this.timeout);
    });
  }
}


function reset() {
  pieceElement.setAttribute('style', defaultPiecePosition);
  result.textContent = '';
  result.classList.remove(successModifier);
}

function run() {
  let piece = new Piece();

  plan(piece);
  piece.go();
}

function plan(piece) {
  // pass start direction only
  stepper(piece, 'right');
}

//added function which pushes steps to steps array
function stepper(piece, startDir) {
  let nextDirection = startDir;
  let k = 10;
  for (let i = 10; i > 0; i--) {
    for (let j = k; j > 0; j--) {
      piece.addStep(nextDirection);
    }
    k--;
    nextDirection = changeDir(nextDirection);
  }

  piece.addStep(nextDirection);
  for (let i = 10; i > 0; i--) {
    for (let j = 1; j <= k; j++) {
      piece.addStep(nextDirection);
    }
    k++;
    nextDirection = changeDirReversed(nextDirection);
  }
}

function changeDir(dir) {
  switch (dir) {
    case 'right':
      return 'down';
    case 'down':
      return 'left';
    case 'left':
      return 'up';
    case 'up':
      return 'right';
    default:
      break;
  }
}

function changeDirReversed(dir) {
  switch (dir) {
    case 'right':
      return 'up';
    case 'down':
      return 'right';
    case 'left':
      return 'down';
    case 'up':
      return 'left';
    default:
      break;
  }
}

function main() {
  reset();
  run();
}

start.addEventListener('click', main);