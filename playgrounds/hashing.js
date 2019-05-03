const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id : 10
};

var hash = jwt.sign(data,'vamsi123');
console.log(hash);
var decoded = jwt.verify(hash,'vamsi123');
console.log(decoded);

// var token = {
//     data,
//     hash : SHA256(data + "testing").toString()
// };

// // token.data.id = 11;
// // token.hash = SHA256(token.data).toString();

// if (token.hash === SHA256(token.data + "testing").toString()) {
//     console.log("The data is intact");
// } else {
//     console.log("Data is corrupted");
// }