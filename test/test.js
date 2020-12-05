var temptoken = require('temp-token');

var token = new temptoken.TempToken("1234");

token.make("token test", 18000000);

console.log(token.checkToken("U2FsdGVkX1/ikga5qciiEOXrpJ7VxjA9T+YnfYPU2BhVHhaMipEHjo+3QOS3mILY+Ib/PPrumGm+w6jUl4RtphfKxgwtoB4kH+PKuP6Xm5k="));