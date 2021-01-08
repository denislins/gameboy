import AbstractRenderer from './AbstractRenderer.js';

export default class WindowRenderer extends AbstractRenderer {
  refreshState(_row) {
    this.isWindowEnabled = this.controller.isWindowEnabled();
    this.tableBaseAddress = this.controller.getWindowBaseAddress();
    this.tilesBaseAddress = this.controller.getTilesBaseAddress();

    this.windowX = this.mmu.registers.read('windowX') - 7;
    this.windowY = this.mmu.registers.read('windowY');
    this.scrollX = this.mmu.registers.read('scrollX');

    this.palette = this.mmu.registers.read('backgroundPalette');
  }

  isWindowEnabledAt(row, column) {
    if (!this.isWindowEnabled) {
      return false;
    } else if (this.windowY > row) {
      return false;
    } else if (this.windowX > column) {
      return false;
    }

    return true;
  }

  renderPixel(row, column) {
    let windowColumn;

    if (column >= this.windowX) {
      windowColumn = column - this.windowX;
    } else {
      windowColumn = this.scrollX + column;
    }

    const windowRow = row - this.windowY;
    const tileNumber = this.calculateTileNumber(windowRow, windowColumn);

    return this.calculatePixelColor(tileNumber, windowRow, windowColumn);
  }
}
