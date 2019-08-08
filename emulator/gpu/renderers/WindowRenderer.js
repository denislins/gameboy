import AbstractRenderer from './AbstractRenderer.js';

export default class WindowRenderer extends AbstractRenderer {
  isWindowEnabledAt(row, column) {
    if (!this.controller.isWindowEnabled()) {
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

  get windowX() {
    return this.mmu.registers.read('windowX') - 7;
  }

  get windowY() {
    return this.mmu.registers.read('windowY');
  }

  get scrollX() {
    return this.mmu.registers.read('scrollX');
  }

  get tableBaseAddress() {
    return this.controller.getWindowBaseAddress();
  }

  get palette() {
    return this.mmu.registers.read('backgroundPalette');
  }
}
