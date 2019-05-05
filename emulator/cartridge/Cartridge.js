export default class Cartridge {
  constructor(path) {
    this.path = path;
  }

  async read() {
    let response;

    try {
      response = await fetch(this.path);
    } catch (e) {
      throw new Error('Could not read cartridge');
    }

    return this.parseResponse(response);
  }

  async parseResponse(response) {
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve) => {
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
