export default class AbstractRenderer {
  constructor(mmu) {
    this.mmu = mmu;
    this.controller = mmu.registers.get('lcdController');
  }

  renderPixel(_row, _column) {
    throw new Error('not implemented');
  }

  calculatePixelColor(tileNumber, row, column, spriteHeight = 8) {
    const tileAddress = this.calculateTileAddress(tileNumber);

    const tileAddressOffset = (row % spriteHeight) * 2;
    const tileRowAddress = tileAddress + tileAddressOffset;

    const internalColor = this.calculateInternalColor(tileRowAddress, column % 8);

    if (internalColor === undefined) {
      return undefined;
    }

    return this.mapDisplayColor(internalColor);
  }

  calculateTileNumber(row, column) {
    const tileIdentityOffset = Math.floor(row / 8) * 32 + Math.floor(column / 8);
    const tileIdentityAddress = this.tableBaseAddress + tileIdentityOffset;

    return this.mmu.read(tileIdentityAddress);
  }

  calculateTileAddress(tileNumber) {
    if (this.tilesBaseAddress === 0x8800) {
      return this.tilesBaseAddress + (tileNumber ^ 0x80) * 16;
    }

    return this.tilesBaseAddress + tileNumber * 16;
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
    const shift = color * 2;
    const mask = 0b11 << shift;

    return (this.palette & mask) >> shift;
  }

  get tableBaseAddress() {
    throw new Error('not implemented');
  }

  get tilesBaseAddress() {
    return this.controller.getTilesBaseAddress();
  }
}
