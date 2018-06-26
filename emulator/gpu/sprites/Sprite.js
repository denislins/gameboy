export default class Sprite {
  constructor(x, y, index, flags) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.flags = flags;
  }

  isVisible() {
    return this.x > 0 && this.y > 0;
  }
}
