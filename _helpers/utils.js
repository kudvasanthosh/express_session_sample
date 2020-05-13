const jwtDecode = require('jwt-decode');

function decodeHeader(jwtHeader){
    let tokendata=jwtHeader.split(" ");
    return jwtDecode(tokendata[1]);
}

module.exports={
    decodeHeader  
}