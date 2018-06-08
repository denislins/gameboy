export default class Pixel {
  constructor(screen, row, column) {
    this.canvas = screen.canvas;
    this.context = this.canvas.getContext('2d', { alpha: false });

    this.width = Math.floor(this.canvas.width / screen.width);
    this.height = Math.floor(this.canvas.height / screen.height);

    this.row = row;
    this.column = column;
  }

  draw() {
    const newColor = this.getColor();

    if (newColor !== this.color) {
      this.color = newColor;

      this.context.fillStyle = this.color;
      this.context.fillRect(this.column * this.width, this.row * this.height, this.width, this.height);
    }
  }

  getColor() {
    const colors = ['#333333', '#666666', '#999999', '#CCCCCC'];
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
  }
}
