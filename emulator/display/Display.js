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

  test() {
    this.fps = 0;
    this.currentSecond = new Date().getSeconds();

    this.counter = document.getElementById('fps');

    const repaint = () => {
      this.draw();

      const currentSecond = new Date().getSeconds();

      if (currentSecond === this.currentSecond) {
        this.fps++;
      } else {
        this.counter.innerText = this.fps;

        this.fps = 1;
        this.currentSecond = new Date().getSeconds();
      }

      requestAnimationFrame(repaint);
    };

    requestAnimationFrame(repaint);
  }

  draw() {
    const image = this.context.createImageData(this.canvas.width, this.canvas.height);

    this.pixels.forEach(pixel => pixel.draw(image));
    this.context.putImageData(image, 0, 0);
  }
}
