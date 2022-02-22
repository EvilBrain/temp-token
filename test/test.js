var temptoken = require('../build');

var token = new temptoken.TempToken("1234");

let tk = token.create("token test", 10);

token.revoke()

console.log(token.check(tk))