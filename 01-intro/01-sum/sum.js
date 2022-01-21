function sum( a, b ) {
  [a, b].forEach( ( val, index ) => {
    if ( ! isNumber( val ) ) {
      throw new TypeError( 'Parameter ' + ( index + 1 ) + ' is not a number type.' );
    }
  } );

  return a + b;
}

function isNumber( val ) {
  // Maybe number can be passed as a string?
  // return (
  //   ( val != null ) &&
  //   ( val.toString().replaceAll(/\s/g, '') !== '' ) &&
  //   ! isNaN( Number( val.toString() ) )
  // );

  return typeof val === 'number';
}

module.exports = sum;
