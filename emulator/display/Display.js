import Pixel from './Pixel.js';

export default class Display {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.width = 160;
    this.height = 144;

    this.initPixels();
  }

  initPixels() {
    let row = -1;

    this.pixels = [...Array(this.width * this.height)].map((_, index) => {
      const column = index % this.width;

      if (column === 0) {
        row++;
      }

      return new Pixel(this, row, column);
    });
  }

  draw() {
    const image = this.context.createImageData(this.canvas.width, this.canvas.height);

    this.pixels.forEach(pixel => pixel.draw(image));
    this.context.putImageData(image, 0, 0);
  }
}
