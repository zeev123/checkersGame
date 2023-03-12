export default class LastPickData {
  indexes = [];
  piece = {};
  isDoubleEating = false;
  doubleEatingIndex;
  constructor(indexes, piece) {
    this.indexes = indexes;
    this.piece = piece;
    this.doubleEatingIndex = 0;
  }
  getIndexes() {
    return this.indexes;
  }
  setIndexes(indexes) {
    this.indexes = indexes;
  }
  getPiece() {
    return this.piece;
  }
  setPiece(piece) {
    this.piece = piece;
  }
  getIsDoubleEating() {
    return this.isDoubleEating;
  }
  setIsDoubleEating(isDoubleEating) {
    this.isDoubleEating = isDoubleEating;
  }
  getDoubleEatingIndex() {
    return this.doubleEatingIndex;
  }
  setDoubleEatingIndex(doubleEatingIndex) {
    this.doubleEatingIndex = doubleEatingIndex;
  }
}
