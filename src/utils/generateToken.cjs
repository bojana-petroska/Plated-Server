"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var generateToken = function (userId) {
    var token = jwt.sign({ id: userId }, 'a5c0effbf8a398bface402709bd41970e057b217b5b52c1d580851198f92767898e0a32088cb05a032a683e6ad2f64c6172325df6f4e43d3d0768ccc61298273', { expiresIn: '1h' });
    return token;
};
generateToken(87);
console.log("Token for user 87: ".concat(generateToken(87)));
exports.default = generateToken;
