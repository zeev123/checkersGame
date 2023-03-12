export default class GameState {
  pieces = this.pieces;
  piecesToBurn = [];
  errorMsg = "";
  paintIndexes = [];
  needToDeletePiece = -1;
  changeIndexes = { indexFrom: -1, indexTo: -1, indexToClassName: "" };
  eatIndexe = -1;
  constructor(pieces) {
    this.pieces = pieces;
  }
  getIndexFrom() {
    return this.changeIndexes.indexFrom;
  }
  getIndexTo() {
    return this.changeIndexes.indexTo;
  }
  getIndexToClassName() {
    return this.changeIndexes.indexToClassName;
  }
  getPieces() {
    return this.pieces;
  }
  setPieces(pieces) {
    this.pieces = pieces;
  }
  getPiecesToBurn() {
    return this.piecesToBurn;
  }
  setPiecesToBurn(piecesToBurn) {
    this.piecesToBurn = piecesToBurn;
  }
  getErrorMsg() {
    return this.errorMsg;
  }
  setErrorMsg(errorMsg) {
    this.errorMsg = errorMsg;
  }
  getPaintIndexes() {
    return this.paintIndexes;
  }
  setPaintIndexes(paintIndexes) {
    this.paintIndexes = paintIndexes;
  }
  getNeedToDeletePiece() {
    return this.needToDeletePiece;
  }
  setNeedToDeletePiece(needToDeletePiece) {
    this.needToDeletePiece = needToDeletePiece;
  }
  getChangeIndexes() {
    return this.changeIndexes;
  }
  setChangeIndexes(changeIndexes) {
    this.changeIndexes = changeIndexes;
  }
  setChangeIndexesIndexToName(indexToName) {
    this.changeIndexes.indexToClassName = indexToName;
  }
  getEatIndexe() {
    return this.eatIndexe;
  }
  setEatIndexe(eatIndexe) {
    this.eatIndexe = eatIndexe;
  }
}
