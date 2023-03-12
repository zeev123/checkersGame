export default class Piece {
  name;
  id;
  isWhite;
  clasName;
  getClasName() {
    return this.clasName;
  }
  setClassName(clasName) {
    this.clasName = clasName;
  }
  getId() {
    return parseInt(this.id);
  }
  getName() {
    return this.name;
  }
  getOptionalIndexes() {
    console.log("in base getOptionalIndexes");
  }
  getIsWhite() {
    return this.isWhite;
  }
  constructor(id, name) {
    this.name = name;
    this.id = id;
    this.isWhite = name.includes("white") ? true : false;
  }
}
export const PieceNames = {
  WHITE_PAWN: "white-Pawn",
  BLACK_PAWN: "black-Pawn",
  WHITE_KING: "white-king",
  BLACK_KING: "black-king",
  EMPTY_PIECE_BLACK: "empty-piece-b",
  EMPTY_PIECE_WHITE: "empty-piece-w",
};
