import AbstractRenderer from './AbstractRenderer.js';

export default class BackgroundRenderer extends AbstractRenderer {
  refreshState(_row) {
    this.tableBaseAddress = this.controller.getBackgroundBaseAddress();
    this.tilesBaseAddress = this.controller.getTilesBaseAddress();

    this.scrollX = this.mmu.registers.read('scrollX');
    this.scrollY = this.mmu.registers.read('scrollY');

    this.palette = this.mmu.registers.read('backgroundPalette');
  }

  renderPixel(row, column) {
    const actualRow = (this.scrollY + row) % 256;
    const actualColumn = (this.scrollX + column) % 256;
    const tileNumber = this.calculateTileNumber(actualRow, actualColumn);

    return this.calculatePixelColor(tileNumber, actualRow, actualColumn);
  }
}
