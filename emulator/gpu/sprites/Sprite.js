export default class Sprite {
  constructor(x, y, tileNumber, attributes) {
    this.x = x;
    this.y = y;
    this.tileNumber = tileNumber;
    this.attributes = attributes;
    this.color = undefined;
  }

  setColor(color) {
    this.color = color;
  }

  getHorizontalPosition() {
    return this.x - 8;
  }

  getVerticalPosition() {
    return this.y - 16;
  }

  isVisible() {
    return this.x > 0 && this.y > 0;
  }

  isUnderBackground() {
    return this.attributes & 0x80;
  }

  isFlippedVertically() {
    return this.attributes & 0x40;
  }

  isFlippedHorizontally() {
    return this.attributes & 0x20;
  }

  getPaletteNumber() {
    return (this.attributes & 0x10) ? 1 : 0;
  }
}
