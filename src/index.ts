'use strict';

import CryptoJS from "crypto-js";

class TempToken {
    Token: string;
    Time: number;
    Key?: string;
    /**
     * @constructor
     * @param {string} [key="superkey123"] - Secret key of AES encrypt
     */
    constructor(key: string) {
        this.Key = key;
    }
    /**
     * @type {Function} Return temporary token
     * @param {string} token - Token to include in the temporary token
     * @param {number} time - Time in SECONDS of token lifetime
     */
    make(token: string, time: number) {
        this.Token = token;
        this.Time = time;
        try {
            let tempToken = CryptoJS.AES.encrypt(`${this.Token}|&tempToken&|${Date.now() + (this.Time ? this.Time : (43200*1000))}`, `${this.Key}`).toString();
            return tempToken;
        } catch (err) {
            throw new Error(err);
        }
    }
    /**
     * @type {Function} Check the validity of the token 
     * @param token - Temporary token to verify
     */
    checkToken(token: string) {
        this.Token = token;
        try {
            let tempToken = CryptoJS.AES.decrypt(`${this.Token}`, `${this.Key}`).toString(CryptoJS.enc.Utf8).split("|&tempToken&|");
            let cToken = tempToken[0],
                time = parseInt(tempToken[1]);
            if(time > Date.now()) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { TempToken };