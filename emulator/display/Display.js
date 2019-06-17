import Pixel from './Pixel.js';

export default class Display {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.width = 160;
    this.height = 144;

    this.image = this.context.createImageData(this.canvas.width, this.canvas.height);

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

  draw(colors) {
    this.pixels.forEach((pixel, index) => {
      pixel.draw(this.image, colors[index]);
    });

    this.context.putImageData(this.image, 0, 0);
  }
}
