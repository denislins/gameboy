export default class Pixel {
  constructor(screen, row, column) {
    this.canvas = screen.canvas;

    this.width = Math.floor(this.canvas.width / screen.width);
    this.height = Math.floor(this.canvas.height / screen.height);

    this.row = row;
    this.column = column;
  }

  draw(image) {
    this.randomizeColor();

    let index;

    for (let w = 0; w < this.width; w++) {
      for (let h = 0; h < this.height; h++) {
        index = w * 4 + this.column * this.width * 4 +
          this.row * this.canvas.width * this.height * 4 + h * this.canvas.width * 4;

        image.data[index + 3] = this.color;
      }
    }
  }

  randomizeColor() {
    const colors = [255, 192, 96, 0];
    const index = Math.floor(Math.random() * colors.length);

    if (colors[index] !== this.color) {
      this.color = colors[index];
    }
  }
}
