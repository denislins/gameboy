import AbstractRenderer from './AbstractRenderer.js';

export default class WindowRenderer extends AbstractRenderer {
  isWindowEnabledAt(row, column) {
    if (!this.controller.isWindowEnabled()) {
      return false;
    } else if (this.windowY > row) {
      return false;
    } else if (this.windowX - 7 > column) {
      return false;
    }

    return true;
  }

  renderPixel(row, column) {
    let actualColumn;

    if (column >= this.windowX) {
      actualColumn = column - this.windowX + 7;
    } else {
      actualColumn = this.scrollX + column;
    }

    const actualRow = row - this.windowY;
    const tileNumber = this.calculateTileNumber(actualRow, actualColumn);

    return this.calculatePixelColor(tileNumber, actualRow, actualColumn);
  }

  get windowX() {
    return this.mmu.registers.read('windowX');
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
