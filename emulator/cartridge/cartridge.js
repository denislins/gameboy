export default class Cartridge {
  construct(path) {
    this.path = path;
  }

  async read() {
    const response = await fetch('/tetris.gb');
    return this.parseResponse(response);
  }

  async parseResponse(response) {
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const byteArray = this.getByteArray(reader.result);
        resolve(byteArray);
      };

      reader.readAsBinaryString(blob);
    });
  }

  getByteArray(string) {
    const byteArray = [];

    for (let i = 0; i < string.length; i++) {
      byteArray.push(string.charCodeAt(i));
    }

    return byteArray;
  }
}
