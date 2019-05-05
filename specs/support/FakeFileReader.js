export default class FakeFileReader {
  readAsBinaryString(blob) {
    this.result = `bin${blob}`;
    this.onload();
  }
}
