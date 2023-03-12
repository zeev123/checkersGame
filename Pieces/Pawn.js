import { getLine } from "../functions/internalFunctions.js";
import Piece, { PieceNames } from "./Piece.js";
export default class Pawn extends Piece {
  getOptionalIndexes = (pieces) => {
    let indexes = [];
    let line = getLine(this.getId());
    if (this.isWhite) {
      if (this.getId() - 7 >= 0) {
        if (
          pieces[this.getId() - 7].getName() == PieceNames.EMPTY_PIECE_BLACK &&
          getLine(this.getId() - 7) == line + 1
        ) {
          indexes.push(this.getId() - 7);
        }
      }
      if (this.getId() - 9 >= 0) {
        if (
          pieces[this.getId() - 9].getName() == PieceNames.EMPTY_PIECE_BLACK &&
          getLine(this.getId() - 9) == line + 1
        ) {
          indexes.push(this.getId() - 9);
        }
      }
      if (this.getId() - 14 <= 63 && this.getId() - 14 >= 0) {
        if (pieces[this.getId() - 7].getName().includes("black")) {
          if (
            pieces[this.getId() - 14].getName() ==
              PieceNames.EMPTY_PIECE_BLACK &&
            getLine(this.getId() - 14) == line + 2
          ) {
            indexes.push(this.getId() - 14);
          }
        }
      }
      if (this.getId() - 18 <= 63 && this.getId() - 18 >= 0) {
        if (pieces[this.getId() - 9].getName().includes("black")) {
          if (
            pieces[this.getId() - 18].getName() ==
              PieceNames.EMPTY_PIECE_BLACK &&
            getLine(this.getId() - 18) == line + 2
          ) {
            indexes.push(this.getId() - 18);
          }
        }
      }
    } else if (!this.ishite) {
      if (this.getId() + 7 <= 63) {
        if (
          pieces[this.getId() + 7].getName() == PieceNames.EMPTY_PIECE_BLACK &&
          getLine(this.getId() + 7) == line - 1
        ) {
          indexes.push(this.getId() + 7);
        }
      }
      if (this.getId() + 9 <= 63) {
        if (
          pieces[this.getId() + 9].getName() == PieceNames.EMPTY_PIECE_BLACK &&
          getLine(this.getId() + 9) == line - 1
        ) {
          indexes.push(this.getId() + 9);
        }
      }
      if (this.getId() + 14 <= 63 && this.getId() + 14 >= 0) {
        if (pieces[this.getId() + 7].getName().includes("white")) {
          if (
            pieces[this.getId() + 14].getName() ==
              PieceNames.EMPTY_PIECE_BLACK &&
            getLine(this.getId() + 14) == line - 2
          ) {
            indexes.push(this.getId() + 14);
          }
        }
      }
      if (this.getId() + 18 <= 63 && this.getId() + 18 >= 0) {
        if (pieces[this.getId() + 9].getName().includes("white")) {
          if (
            pieces[this.getId() + 18].getName() ==
              PieceNames.EMPTY_PIECE_BLACK &&
            getLine(this.getId() + 18) == line - 2
          ) {
            indexes.push(this.getId() + 18);
          }
        }
      }
    }
    return indexes;
  };
}
