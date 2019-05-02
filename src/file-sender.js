const request = require("request");
const prettyBytes = require("pretty-bytes");

/**
 * @param {*} error
 * @param {request.Response} response
 */
const responseHandler = (error, response) => {
  if (error) {
    console.error(error);
    return;
  }
  if (response.statusCode !== 200) {
    console.error(`Status ${response.statusCode}`);
  }
  console.log(response.body);
};

class FileSender {
  /**
   * @param {{uri:string,method:string}} config
   */
  constructor({ uri, method = "PUT", headers = {} }) {
    this.uri = uri;
    this.method = method;
    this.headers = headers;
  }

  /**
   * @param {Buffer} buffer
   */
  send = buffer => {
    console.log(`Sending ${prettyBytes(buffer.length)} to ${this.uri}`);
    request.put(
      {
        url: this.uri,
        formData: { "img.jpg": buffer },
        headers: this.headers
      },
      responseHandler
    );
  };
}

module.exports = FileSender;
