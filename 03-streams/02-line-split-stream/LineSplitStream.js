const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.tempString = '';
  }

  _transform(chunk, encoding, callback) {
    // Prepend the previous string if exists
    const str = ( this.tempString != null ? this.tempString : '' ) + chunk.toString( 'utf-8' );

    // Split the chunk
    const lines = str.split( os.EOL );

    // Cut the last split part of the chunk
    this.tempString = lines.pop();

    // Push every line separatelly
    for ( const line of lines ) {
      this.push( line );
    }

    callback();
  }


  _flush(callback) {
    try {
      // Push the last saved part
      this.push( this.tempString != null ? this.tempString : '' );

      callback();
    } catch ( err ) {
      callback( err );
    }
  }
}

module.exports = LineSplitStream;
