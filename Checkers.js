import CheckerGame from "./checkerGame/CheckerGame.js";

window.onload = () => {
  let checkerBoard = new CheckerGame();
  checkerBoard.play();
};
