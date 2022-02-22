'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempToken = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var TempToken = (function () {
    function TempToken(key) {
        this.Key = key;
        this.Revoked = [];
        this.Generated = [];
    }
    TempToken.prototype.create = function (token, time) {
        var _this = this;
        if (time === void 0) { time = 43200; }
        this.Token = token;
        this.Time = time * 1000;
        try {
            var tempToken = new Token(this.Token, this.Key, this.Time);
            this.Generated.push(this.Token);
            setTimeout(function () {
                _this.Generated.splice(_this.Generated.indexOf(_this.Token), 1);
            });
            return tempToken.token;
        }
        catch (err) {
            throw new Error(err);
        }
    };
    TempToken.prototype.check = function (token) {
        this.Token = token;
        if (this.Revoked.indexOf(token) > -1)
            return false;
        try {
            var tempToken = Token.decrypt(this.Token, this.Key);
            var time = Token.getDate(tempToken);
            if (this.Generated.indexOf(Token.getString(tempToken)) < 0)
                return false;
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
    TempToken.prototype.revoke = function (token) {
        this.Revoked.push(token);
    };
    return TempToken;
}());
exports.TempToken = TempToken;
var Token = (function () {
    function Token(token, key, duration) {
        if (duration === void 0) { duration = 43200; }
        this.Token = token;
        this.Key = key;
        this.Time = duration;
        this.token = this.generate();
    }
    Token.decrypt = function (token, key) {
        return crypto_js_1.default.AES.decrypt("".concat(token), "".concat(key)).toString(crypto_js_1.default.enc.Utf8).split("|&tempToken&|");
    };
    Token.prototype.generate = function () {
        return crypto_js_1.default.AES.encrypt("".concat(this.Token, "|&tempToken&|").concat(Date.now() + (this.Time)), "".concat(this.Key)).toString();
    };
    Token.getString = function (token) {
        return token[0];
    };
    Token.getDate = function (token) {
        return parseInt(token[1]);
    };
    return Token;
}());
