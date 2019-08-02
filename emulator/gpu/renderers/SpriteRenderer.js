import AbstractRenderer from './AbstractRenderer.js';

export default class SpriteRenderer extends AbstractRenderer {
  renderPixel(_row, _column) {
    return null;
  }

  get tableBaseAddress() {
    return 0xFE00;
  }
}
