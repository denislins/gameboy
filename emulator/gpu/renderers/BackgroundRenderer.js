import AbstractRenderer from './AbstractRenderer.js';

export default class BackgroundRenderer extends AbstractRenderer {
  renderPixel(row, column) {
    const actualRow = (this.scrollY + row) % 256;
    const actualColumn = (this.scrollX + column) % 256;
    const tileNumber = this.calculateTileNumber(actualRow, actualColumn);

    return this.calculatePixelColor(tileNumber, actualRow, actualColumn);
  }

  get scrollX() {
    return this.mmu.registers.read('scrollX');
  }

  get scrollY() {
    return this.mmu.registers.read('scrollY');
  }

  get tableBaseAddress() {
    return this.controller.getBackgroundBaseAddress();
  }

  get palette() {
    return this.mmu.registers.read('backgroundPalette');
  }
}
