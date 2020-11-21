'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = __importDefault(require("crypto-js"));
var TempToken = (function () {
    function TempToken(key) {
        this.Key = key;
    }
    TempToken.prototype.make = function (token, time) {
        this.Token = token;
        this.Time = time;
        try {
            var tempToken = crypto_js_1.default.AES.encrypt(this.Token + "|&tempToken&|" + (Date.now() + (this.Time ? (this.Time * 1000) : (43200 * 1000))), "" + this.Key).toString();
            return tempToken;
        }
        catch (err) {
            throw new Error(err);
        }
    };
    TempToken.prototype.checkToken = function (token) {
        this.Token = token;
        try {
            var tempToken = crypto_js_1.default.AES.decrypt("" + this.Token, "" + this.Key).toString(crypto_js_1.default.enc.Utf8).split("|&tempToken&|");
            var cToken = tempToken[0], time = parseInt(tempToken[1]);
            if (time > Date.now()) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            throw new Error(err);
        }
    };
    return TempToken;
}());
exports.TempToken = TempToken;
