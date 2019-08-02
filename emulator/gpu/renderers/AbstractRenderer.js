export default class AbstractRenderer {
  constructor(mmu) {
    this.mmu = mmu;
    this.controller = mmu.registers.get('lcdController');
  }

  renderPixel(_row, _column) {
    throw new Error('not implemented');
  }

  calculatePixelColor(row, column) {
    const tileNumber = this.calculateTileNumber(row, column);
    const tileAddress = this.calculateTileAddress(tileNumber);

    const tileAddressOffset = (row % 8) * 2;
    const tileRowAddress = tileAddress + tileAddressOffset;

    const internalColor = this.calculateInternalColor(tileRowAddress, column % 8);
    const displayColor = this.mapDisplayColor(internalColor);

    return displayColor;
  }

  calculateTileNumber(row, column) {
    const tileIdentityOffset = Math.floor(row / 8) * 32 + Math.floor(column / 8);
    const tileIdentityAddress = this.tableBaseAddress + tileIdentityOffset;

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
    const shift = color * 2;
    const mask = 0b11 << shift;

    return (this.backgroundPallete & mask) >> shift;
  }

  get tableBaseAddress() {
    throw new Error('not implemented');
  }

  get backgroundPallete() {
    return this.mmu.registers.read('backgroundPallete');
  }
}
