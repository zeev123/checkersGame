import Piece from "../pieces/Piece.js";
import Pawn from "../pieces/Pawn.js";
import King from "../pieces/King.js";
import { PieceNames } from "../pieces/Piece.js";
import LastPickData from "./LastPickData.js";
import { initGame, renderGame } from "./UIGame.js";
import { changeTurnMsg } from "../functions/internalFunctions.js";
import GameState from "./GameState.js";

export default class CheckerGame {
  pieces = [];
  isWhiteTurn = true;
  isSecondPick = false;
  lastPickData = new LastPickData();
  play() {
    this.isWhiteTurn = true;
    changeTurnMsg(this.isWhiteTurn);
    this.pieces = [];
    this.initBoard();
  }
  getAllIndexesOfAnami(PieceId) {
    let indexes = [];
    const piece = this.pieces[PieceId];
    this.pieces.forEach((pieceElement) => {
      if (pieceElement.getIsWhite() != piece.getIsWhite()) {
        if (
          pieceElement.getName().includes("Pawn") ||
          pieceElement.getName().includes("king")
        ) {
          let pieceIndexes = pieceElement.getOptionalIndexes(this.pieces);
          pieceIndexes.forEach((element) => {
            indexes.push(element);
          });
        }
      }
    });
    return indexes;
  }
  replacePawnWithKing(index, className) {
    this.pieces[index] = new King(index, className);
  }
  ChangePieceByIndex(id, className) {
    if (className == PieceNames.EMPTY_PIECE_BLACK) {
      this.pieces[id] = new Piece(id, className);
    } else {
      this.pieces[id] = new Pawn(id, className);
    }
    if (
      className == PieceNames.WHITE_KING ||
      className == PieceNames.BLACK_KING
    ) {
      this.pieces[id] = new King(id, className);
    }
  }
  getEatData(indexFrom, indexTo) {
    let index = -1;
    switch (indexFrom - indexTo) {
      case 14:
        index = indexFrom - 7;
        break;
      case 18:
        index = indexFrom - 9;
        break;
    }
    switch (indexTo - indexFrom) {
      case 14:
        index = indexTo - 7;
        break;
      case 18:
        index = indexTo - 9;
        break;
    }
    if (index == -1) {
      return { isMoveIsEat: false };
    } else {
      return { isMoveIsEat: true, index };
    }
  }
  isPieceCanEatAgain(indexTo, isMoveIsEat, gameState) {
    if (!isMoveIsEat) return;
    const pieceForChackDoubleEat = this.pieces[indexTo];
    let doubleIndexes = pieceForChackDoubleEat.getOptionalIndexes(this.pieces);
    doubleIndexes.forEach((i) => {
      let isEat = this.getEatData(pieceForChackDoubleEat.getId(), i);
      console.log(isEat);
      if (isEat.getEatData) {
        this.lastPickData.setIsDoubleEating(true);
        this.lastPickData.setDoubleEatingIndex(i);
        gameState.setPaintIndexes(i);
        this.lastPickData.setIndexes([i]);
        this.lastPickData.setPiece(pieceForChackDoubleEat);
        document.getElementById("turnMsg").innerHTML = "White turn";
        this.isWhiteTurn = !this.isWhiteTurn;
      }
    });
  }
  getPlayersThatCouldEat(indexTo) {
    const indexToPiece = this.pieces[indexTo];
    let optionaPlayers = [];
    this.pieces.forEach((piece) => {
      if (!piece.getName().includes("empty")) {
        if (piece.getIsWhite() == indexToPiece.getIsWhite()) {
          let indexes = piece.getOptionalIndexes(this.pieces);
          let pieceObj = { unEatIndexes: [], index: -1 };
          indexes.forEach((index) => {
            let isEat = this.getEatData(piece.getId(), index);
            if (isEat.isMoveIsEat) {
              pieceObj.index = piece.getId();
            } else if (!isEat.isMoveIsEat) {
              pieceObj.unEatIndexes.push(index);
            }
          });
          optionaPlayers.push(pieceObj);
        }
      }
    });
    return optionaPlayers;
  }
  isNeedUpgradeToPawn(indexTo, gameState) {
    if (this.isWhiteTurn && indexTo > 0 && indexTo < 8) {
      this.replacePawnWithKing(indexTo, PieceNames.WHITE_KING);
      gameState.setChangeIndexesIndexToName(PieceNames.WHITE_KING);
    } else if (!this.isWhiteTurn && indexTo < 63 && indexTo > 55) {
      this.replacePawnWithKing(indexTo, PieceNames.BLACK_KING);
      gameState.setChangeIndexesIndexToName(PieceNames.BLACK_PAWN);
    }
  }
  doMove(nextPiece, gameState) {
    let pieceIndexTo = nextPiece.getId();
    let PieceIndexFrom = this.lastPickData.getPiece().getId();
    let eatData = this.getEatData(PieceIndexFrom, pieceIndexTo);
    if (eatData.isMoveIsEat) {
      this.ChangePieceByIndex(eatData.index, PieceNames.EMPTY_PIECE_BLACK);
      gameState.setEatIndexe(eatData.index);
    }
    this.changeDataAndSaveInGameStata(PieceIndexFrom, pieceIndexTo, gameState);
    this.isNeedUpgradeToPawn(pieceIndexTo, gameState);
    this.lastPickData.setIsDoubleEating(false);
    this.areWeHaveWinner(pieceIndexTo, gameState);
    this.isPieceCanEatAgain(pieceIndexTo, eatData.isMoveIsEat, gameState);
    this.isWhiteTurn = !this.isWhiteTurn;
    changeTurnMsg(this.isWhiteTurn);
    return eatData.getEatData;
  }
  changeDataAndSaveInGameStata(indexFrom, indexTo, gameState) {
    let indexToClassName = this.lastPickData.getPiece().getName();
    this.ChangePieceByIndex(indexTo, indexToClassName);
    this.ChangePieceByIndex(indexFrom, PieceNames.EMPTY_PIECE_BLACK);
    let changeIndexes = { indexFrom, indexTo, indexToClassName };
    gameState.setChangeIndexes(changeIndexes);
    gameState.setNeedToDeletePiece(indexFrom);
  }
  areWeHaveWinner(indexTo, gameState) {
    let indexes = this.getAllIndexesOfAnami(indexTo);
    if (indexes.length == 0) {
      let msg = this.isWhiteTurn ? "whitw winn !!" : "black winn !!";
      gameState.setErrorMsg(msg);
      this.play();
      renderGame(gameState, this);
      return;
    }
  }
  chackIfNeedBurnPieces(optionaPlayers, gameState) {
    let piecesToBurn = [];
    optionaPlayers.forEach((index) => {
      if (index.index != -1) {
        if (
          this.pieces[index.index].getName() != PieceNames.EMPTY_PIECE_BLACK
        ) {
          piecesToBurn.push(index.index);
          setTimeout(() => {
            this.ChangePieceByIndex(index.index, PieceNames.EMPTY_PIECE_BLACK);
          }, 1700);
        } else {
          index.unEatIndexes.forEach((i) => {
            if (this.pieces[i].getName() != PieceNames.EMPTY_PIECE_BLACK) {
              piecesToBurn.push(index.index);
              setTimeout(() => {
                this.ChangePieceByIndex(i, PieceNames.EMPTY_PIECE_BLACK);
              }, 1700);
            }
          });
        }
        gameState.setPiecesToBurn(piecesToBurn);
      }
    });
  }
  isMoveIsDoubleEating(piceId, gameState, turnHappend, piceMoved) {
    if (this.lastPickData.getIsDoubleEating()) {
      if (piceId == this.lastPickData.getDoubleEatingIndex()) {
        this.doMove(piceMoved, gameState);
        renderGame(gameState, this);
        return;
      }
      turnHappend = true;
      gameState.setErrorMsg("you should eat again");
    }
  }
  isPlayerTryMoveEnamyPiece(turnHappend, gameState, piceMoved) {
    if (!this.isSecondPick && !turnHappend) {
      if (this.isWhiteTurn != piceMoved.getIsWhite()) {
        gameState.setErrorMsg("wrong move it's not your turn");
        turnHappend = true;
      }
    }
  }
  tryCompleteSeconPick(turnHappend, gameState, indexes, piceMoved) {
    if (this.isSecondPick && !turnHappend) {
      let optionaPlayers = this.getPlayersThatCouldEat(
        this.lastPickData.getPiece().getId()
      );
      if (this.lastPickData.getIndexes().includes(piceMoved.getId())) {
        const paintIndexes = document.getElementsByClassName("optionalIndex");
        for (const paint of paintIndexes) {
          gameState.setPaintIndexes([paint.id]);
        }
        let isEat = this.doMove(piceMoved, gameState);
        if (!isEat) {
          this.chackIfNeedBurnPieces(optionaPlayers, gameState);
        }
      } else {
        gameState.setErrorMsg("wrong move");
        gameState.setPaintIndexes(this.lastPickData.getIndexes());
        this.isSecondPick = false;
        turnHappend = true;
      }
      this.isSecondPick = false;
    } else if (indexes != undefined) {
      this.isSecondPick = true;
      turnHappend = true;
    }
  }
  handleTurn(piceId) {
    let turnHappend = false;
    let gameState = new GameState(this.pieces);
    const piceMoved = this.pieces[piceId];
    let indexes = piceMoved.getOptionalIndexes(this.pieces);
    this.isMoveIsDoubleEating(piceId, gameState, turnHappend, piceMoved);
    this.isPlayerTryMoveEnamyPiece(turnHappend, gameState, piceMoved);
    this.tryCompleteSeconPick(turnHappend, gameState, indexes, piceMoved);
    if (indexes == undefined && !turnHappend) {
      turnHappend = true;
    }
    if (!turnHappend) {
      if (indexes.length == 0) {
        turnHappend = true;
      }
    }
    if (!turnHappend) {
      this.lastPickData.setIndexes(indexes);
      this.lastPickData.setPiece(piceMoved);
      gameState.setPaintIndexes(indexes);
      console.log("indexes is: ", indexes);
    }
    renderGame(gameState, this);
  }
  initBoard() {
    this.createDafaultPieces();
    this.createDefaultsPawns();
    initGame(this);
  }
  createDafaultPieces() {
    let startWithWhite = false;
    let k = 0;
    for (let row = 1; row <= 8; row++) {
      for (let column = 1; column < 9; column++) {
        if (startWithWhite) {
          this.pieces[k] = new Piece(
            k,
            column % 2 == 0
              ? PieceNames.EMPTY_PIECE_WHITE
              : PieceNames.EMPTY_PIECE_BLACK
          );
        } else {
          this.pieces[k] = new Piece(
            k,
            column % 2 != 0
              ? PieceNames.EMPTY_PIECE_WHITE
              : PieceNames.EMPTY_PIECE_BLACK
          );
        }
        k++;
      }
      startWithWhite = !startWithWhite;
    }
  }
  createDefaultsPawns() {
    this.pieces.forEach((e) => {
      if (
        e.getName() == PieceNames.EMPTY_PIECE_BLACK &&
        e.getId() > 0 &&
        e.getId() < 24
      ) {
        this.pieces[e.getId()] = new Pawn(e.getId(), PieceNames.BLACK_PAWN);
      }
      if (
        e.getName() == PieceNames.EMPTY_PIECE_BLACK &&
        e.getId() > 39 &&
        e.getId() < 63
      ) {
        this.pieces[e.getId()] = new Pawn(e.getId(), PieceNames.WHITE_PAWN);
      }
    });
  }
}
