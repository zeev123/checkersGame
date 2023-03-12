import {
  createDivWtithDivChild,
  writeWarningMsg,
} from "../functions/internalFunctions.js";
import { closeModal, openModal } from "../functions/Modal.js";
import { PieceNames } from "../pieces/Piece.js";

let piecesDiv = [];
function ChangePieceByIndex(gameState, id, className) {
  const innerDiv = document.getElementById(id + "inner");
  innerDiv.className = className;
  if (className == PieceNames.EMPTY_PIECE_BLACK) {
    innerDiv.innerHTML = "";
  }
  if (
    className == PieceNames.WHITE_KING ||
    className == PieceNames.BLACK_KING
  ) {
    innerDiv.innerHTML = "k";
    innerDiv.style.color =
      className == PieceNames.BLACK_KING ? "white" : "black";
  }
  paintOrUnPaintOptionalIndexes([], false);
}
export function renderGame(gameState) {
  console.log(gameState);
  if (gameState.getErrorMsg().includes("winn")) {
    writeWarningMsg(gameState.getErrorMsg(), 1000 * 11, "info");
    return;
  }
  if (gameState.errorMsg.trim().length > 0) {
    writeWarningMsg(gameState.getErrorMsg(), 2700, "error");
    paintOrUnPaintOptionalIndexes([], false);
    return;
  }
  console.log("gameState.getPaintIndexes() is: ", gameState.getPaintIndexes());
  paintOrUnPaintOptionalIndexes(gameState.getPaintIndexes());
  changeMoveIndexes(gameState);
  changeEatIndex(gameState);
  addFireGifToPices(gameState);
}
function changeMoveIndexes(gameState) {
  if (gameState.getIndexTo() != -1) {
    ChangePieceByIndex(
      gameState,
      gameState.getIndexFrom(),
      PieceNames.EMPTY_PIECE_BLACK
    );
    ChangePieceByIndex(
      gameState,
      gameState.getIndexTo(),
      gameState.getChangeIndexes().indexToClassName
    );
  }
}
function changeEatIndex(gameState) {
  if (gameState.getEatIndexe() != -1) {
    ChangePieceByIndex(
      gameState,
      gameState.getEatIndexe(),
      PieceNames.EMPTY_PIECE_BLACK
    );
  }
}
function addFireGifToPices(gameState) {
  gameState.getPiecesToBurn().forEach((e) => {
    console.log(gameState.getPieces(), e);
    addFireGif(e, gameState.getPieces()[e].getIsWhite());
    setTimeout(() => {
      ChangePieceByIndex(gameState, e, PieceNames.EMPTY_PIECE_BLACK);
    }, 1500);
  });
}
export function initGame(gameData) {
  const oldDives = document.querySelectorAll(".box");
  for (let oldDiv of oldDives) oldDiv.remove();
  piecesDiv = [];
  createEmptyCells();
  createDefaultsPawns(gameData);
  initModalButtons(gameData);
}
function createEmptyCells() {
  console.log("piecesDiv is: ", piecesDiv);
  let startWithWhite = false;
  const board = document.getElementById("board");
  let k = 0;
  for (let row = 1; row <= 8; row++) {
    for (let column = 1; column < 9; column++) {
      const cell = document.createElement("div");
      cell.classList.add("box");
      cell.id = k;
      if (startWithWhite) {
        cell.classList.add(column % 2 == 0 ? "white" : "black");
      } else {
        cell.classList.add(column % 2 != 0 ? "white" : "black");
      }
      piecesDiv[k] = cell;
      k++;
      board.appendChild(cell);
    }
    startWithWhite = !startWithWhite;
  }
}
function createDefaultsPawns(gameData) {
  gameData.pieces.forEach((e) => {
    if (
      e.getName() == PieceNames.BLACK_PAWN &&
      e.getId() > 0 &&
      e.getId() < 24
    ) {
      const pawn = createDivWtithDivChild(PieceNames.BLACK_PAWN, e.getId());
      pawn.addEventListener("click", () => {
        gameData.handleTurn(e.getId());
      });
      piecesDiv[e.getId()].appendChild(pawn);
    }
    if (
      e.getName() == PieceNames.WHITE_PAWN &&
      e.getId() > 39 &&
      e.getId() < 63
    ) {
      const pawn = createDivWtithDivChild(PieceNames.WHITE_PAWN, e.getId());
      pawn.addEventListener("click", () => {
        gameData.handleTurn(e.getId());
      });
      piecesDiv[e.getId()].appendChild(pawn);
    }
    if (e.getName() == PieceNames.EMPTY_PIECE_BLACK) {
      const pawn = createDivWtithDivChild(
        PieceNames.EMPTY_PIECE_BLACK,
        e.getId()
      );
      pawn.addEventListener("click", () => {
        gameData.handleTurn(e.getId());
      });
      piecesDiv[e.getId()].appendChild(pawn);
    }
  });
}
function paintOrUnPaintOptionalIndexes(indexes, paint = true) {
  console.log("in paint");
  if (!paint) {
    piecesDiv.forEach((e) => {
      e.classList.remove("optionalIndex");
    });
    return;
  }
  console.log("indexes is: ", indexes);
  indexes.forEach((e) => {
    piecesDiv[e].classList.add("optionalIndex");
  });
}
function addFireGif(index, isWhite) {
  const gif = document.createElement("img");
  gif.src = "./images/fireGif.gif";
  if (isWhite) {
    gif.style.backgroundColor = "white";
  }
  const piece = document.getElementById(index + "inner");
  piece.innerHTML = "";
  piece.appendChild(gif);
}
function initModalButtons(gameData) {
  const yesButton = document.getElementById("buttonYes");
  yesButton.addEventListener("click", () => {
    gameData.play();
    closeModal();
  });
  const drawButton = document.getElementById("drawButton");
  drawButton.addEventListener("click", () => {
    let baseMsg = gameData.isWhiteTurn ? "black " : "white ";
    let msg = "player would you agree to the draw request";
    openModal("draw", baseMsg + msg);
  });
  const noButton = document.getElementById("noButton");
  noButton.addEventListener("click", () => {
    closeModal();
  });
  const resignButton = document.getElementById("resignButton");
  resignButton.addEventListener("click", () => {
    openModal("resign");
  });
}
