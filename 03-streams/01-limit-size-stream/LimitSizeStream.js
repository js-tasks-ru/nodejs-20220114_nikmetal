const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.streamedSize = 0;
  }

  _transform(chunk, encoding, callback) {
    let error = null;

    this.streamedSize += chunk.length;

    if (this.streamedSize > this.limit) {
      error = new LimitExceededError();
    }

    callback(error, chunk);
  }
}

module.exports = LimitSizeStream;
