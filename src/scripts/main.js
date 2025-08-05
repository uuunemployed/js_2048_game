'use strict';

import Game from '../modules/Game.class';

const game = new Game();

const blocksRows = Array.from(document.querySelectorAll('tr'));
const score = document.querySelector('.game-score');
const startButton = document.querySelector('.button');
const message = Array.from(document.querySelectorAll('.message'));
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');

function newBlocks(board) {
  for (let i = 0; i < blocksRows.length; i++) {
    const blocksElements = Array.from(blocksRows[i].querySelectorAll('td'));

    for (let j = 0; j < blocksElements.length; j++) {
      if (board[i][j] !== 0) {
        blocksElements[j].textContent = board[i][j];
      } else {
        blocksElements[j].textContent = '';
      }

      blocksElements[j].classList.forEach((cls) => {
        if (cls.startsWith('field-cell--')) {
          blocksElements[j].classList.remove(cls);
        }
        blocksElements[j].classList.add(`field-cell--${board[i][j]}`);
      });
    }
  }
}

function cleanDisplayStyles() {
  message.forEach((el) => {
    el.style.display = 'none';
  });
}

window.addEventListener('keydown', (e) => {
  if (game.getStatus() === 'lose') {
    cleanDisplayStyles();
    messageLose.style.display = 'block';

    return;
  }

  if (game.getStatus() === 'win') {
    cleanDisplayStyles();
    messageWin.style.display = 'block';

    return;
  }

  if (e.key === 'ArrowLeft') {
    game.moveLeft();
  } else if (e.key === 'ArrowRight') {
    game.moveRight();
  } else if (e.key === 'ArrowUp') {
    game.moveUp();
  } else if (e.key === 'ArrowDown') {
    game.moveDown();
  }

  const board = game.getState();

  newBlocks(board);

  score.textContent = String(game.getScore());
});

startButton.addEventListener('click', () => {
  game.start();
  score.textContent = String(game.getScore());

  const board = game.getState();

  newBlocks(board);
  cleanDisplayStyles();
});
