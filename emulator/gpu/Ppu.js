export default class Ppu {
  constructor(mmu) {
    this.mmu = mmu;
    this.controller = this.mmu.registers.get('lcdc');
  }

  draw(row) {
    const pixels = [];
    const pixelOffset = (row % 8) * 2;

    const baseTileAddress = this.controller.getTilesBaseAddress();
    const baseIdentityAddress = this.controller.getBackgroundBaseAddress();

    const identityAddress = baseIdentityAddress + 32 * Math.floor(row / 8);

    for (let i = 0; i < 32; i++) {
      const tileNumber = this.mmu.read(identityAddress + i);
      const tileRowAddress = baseTileAddress + (tileNumber * 16 + pixelOffset);

      const rowPixels = this.renderTileRow(tileRowAddress);

      pixels.push(...rowPixels);
    }

    return pixels;
  }

  renderTileRow(baseAddress) {
    const pixels = [];

    const byte1 = this.mmu.read(baseAddress);
    const byte2 = this.mmu.read(baseAddress + 1);

    for (let i = 0; i < 8; i++) {
      // const mask = 1 << (7 - i);

      const bit1 = byte1 >> (7 - i);
      const bit2 = byte2 >> (7 - i);

      pixels.push((bit2 << 1) | bit1);
    }

    return pixels;
  }
}
