export default class Ppu {
  constructor(mmu) {
    this.mmu = mmu;
    this.controller = this.mmu.registers.get('lcdc');
  }

  draw() {
    const pixels = [];

    for (let row = 0; row < 144; row++) {
      for (let column = 0; column < 160; column++) {
        let pixel;

        if (this.isWindowEnabled(row, column)) {
          pixel = this.renderWindowPixel(row, column);
        } else {
          pixel = this.renderBackgroundPixel(row, column);
        }

        pixels.push(pixel);
      }
    }

    return pixels;
  }

  isWindowEnabled(row, column) {
    if (!this.controller.isWindowEnabled()) {
      return false;
    } else if (this.mmu.registers.read('wy') > row) {
      return false
    } else if ((this.mmu.registers.read('wx') - 7) > column) {
      return false;
    }

    return true;
  }

  renderWindowPixel(row, column) {
    const actualRow = row - this.mmu.registers.read('wy');
    const windowY = this.mmu.registers.read('wx');

    let actualColumn;

    if (column >= windowY) {
      actualColumn = column - windowY + 7;
    } else {
      actualColumn = this.mmu.registers.read('scx') + column;
    }

    const windowBaseAddress = this.controller.getWindowBaseAddress();

    return this.renderPixel(windowBaseAddress, actualRow, actualColumn);
  }

  renderBackgroundPixel(row, column) {
    const actualRow = this.mmu.registers.read('scy') + row;
    const actualColumn = this.mmu.registers.read('scx') + column;

    const backgroundBaseAddress = this.controller.getBackgroundBaseAddress();

    return this.renderPixel(backgroundBaseAddress, actualRow, actualColumn);
  }

  renderPixel(baseAddress, row, column) {
    const tileNumber = this.calculateTileNumber(baseAddress, row, column);
    const tileAddress = this.calculateTileAddress(tileNumber);

    const tileAddressOffset = (row % 8) * 2;
    const tileRowAddress = tileAddress + tileAddressOffset;

    const internalColor = this.calculateInternalColor(tileRowAddress, column % 8);
    const displayColor = this.mapDisplayColor(internalColor);

    return displayColor;
  }

  calculateTileNumber(baseAddress, row, column) {
    const tileIdentityOffset = Math.floor(row / 8) * 32 + Math.floor(column / 8);
    const tileIdentityAddress = baseAddress + tileIdentityOffset;

    return this.mmu.read(tileIdentityAddress);
  }

  calculateTileAddress(tileNumber) {
    const tileBaseAddress = this.controller.getTilesBaseAddress();

    if (tileBaseAddress === 0x8800) {
      return tileBaseAddress + (tileNumber ^ 0x80) * 16;
    }

    return tileBaseAddress + tileNumber * 16;
  }

  calculateInternalColor(baseAddress, pixel) {
    const byte1 = this.mmu.read(baseAddress);
    const byte2 = this.mmu.read(baseAddress + 1);

    const mask = 1 << (7 - pixel);

    const bit1 = (byte1 & mask) >> (7 - pixel);
    const bit2 = (byte2 & mask) >> (7 - pixel);

    return (bit2 << 1) | bit1;
  }

  mapDisplayColor(color) {
    const pallete = this.mmu.registers.read('bgp');

    const shift = color * 2;
    const mask = 0b11 << shift;

    return (pallete & mask) >> shift;
  }
}
