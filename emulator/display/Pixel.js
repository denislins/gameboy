export default class Pixel {
  constructor(display, row, column) {
    this.canvas = display.canvas;

    this.width = Math.floor(this.canvas.width / display.width);
    this.height = Math.floor(this.canvas.height / display.height);

    this.row = row;
    this.column = column;
  }

  draw(image) {
    this.randomizeColor();

    for (let w = 0; w < this.width; w++) {
      for (let h = 0; h < this.height; h++) {
        const index = w * 4 + this.column * this.width * 4
          + this.row * this.canvas.width * this.height * 4 + h * this.canvas.width * 4;

        // avoids creating a middle array
        // eslint-disable-next-line no-param-reassign
        image.data[index + 3] = this.color;
      }
    }
  }

  randomizeColor() {
    const colors = [255, 192, 96, 0];
    const index = Math.floor(Math.random() * colors.length);

    this.color = colors[index];
  }
}
