import Pixel from './pixel.js';

export default class Screen {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 160;
    this.height = 144;
  }

  on() {
    this.initialize();
    this.draw();
  }

  off() {
    cancelAnimationFrame(this.requestId);
  }

  initialize() {
    let row = -1;

    this.pixels = Array(...Array(this.width * this.height)).map((_, index) => {
      const column = index % this.width;

      if (column === 0) {
        row++;
      }

      return new Pixel(this, row, column);
    });
  }

  draw() {
    this.requestId = requestAnimationFrame(() => {
      this.pixels.forEach(pixel => pixel.draw());
      this.draw();
    });
  }
}
