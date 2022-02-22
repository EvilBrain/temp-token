'use strict';

import CryptoJS from "crypto-js";

class TempToken {
    Generated?: Array<string>;
    Token: string;
    Time: number;
    Key?: string;
    Revoked?: Array<string>;
    /**
     * @constructor
     * @param {string} [key="superkey123"] - Secret key of AES encrypt
     */
    constructor(key: string) {
        this.Key = key;
        this.Revoked = []
        this.Generated = []
    }
    /**
     * @type {Function} Return temporary token
     * @param {string} token - Token to include in the temporary token
     * @param {number} time - Time in SECONDS of token lifetime
     */

    create(token: string, time: number=43200) {
        this.Token = token;
        this.Time = time *1000;
        try {
            let tempToken = new Token(this.Token, this.Key, this.Time);
            this.Generated.push(this.Token)
            setTimeout(() => {
                this.Generated.splice(this.Generated.indexOf(this.Token), 1)
            })
            return tempToken.token;
        } catch (err) {
            throw new Error(err);
        }
    }
    /**
     * @type {Function} Check the validity of the token 
     * @param token - Temporary token to verify
     */
    check(token: string) {
        this.Token = token;
        if(this.Revoked.indexOf(token) > -1) return false
        try {
            let tempToken = Token.decrypt(this.Token, this.Key)
            let time = Token.getDate(tempToken)
            if(this.Generated.indexOf(Token.getString(tempToken)) < 0) return false
            if(time > Date.now()) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    
    /**
     * @type {Function} Revoke the token 
     * @param token - Token you want to revoke
     */
    revoke(token: string){
        this.Revoked.push(token)
    }
}

class Token {
    Token: string;
    token: string;
    Key: string;
    Time: number;
    /**
     * @constructor
     * @param {string} [token="myString"] - The string you want to make a token with
     * @param {int} [duration=43200] - Your token's validity duration
     * @param {string} [key="myTokenEncryptionKey"] - Your encryption key
     */
    constructor(token: string, key: string, duration:number=43200){
        this.Token = token
        this.Key = key
        this.Time = duration
        this.token = this.generate()
    }

    /**
     * @type {Function} Convert token on an array, with the string you tokened, and the timestamp
     * @param token - Token you want to get infos from
     */
    static decrypt(token: string, key: string){
        return CryptoJS.AES.decrypt(`${token}`, `${key}`).toString(CryptoJS.enc.Utf8).split("|&tempToken&|");
    }

    /**
     * @type {Function} Generate your token
     */
    generate(){
        return CryptoJS.AES.encrypt(`${this.Token}|&tempToken&|${Date.now() + (this.Time)}`, `${this.Key}`).toString()
    }

    /**
     * @type {Function} Get the string you converted to token
     * @param token - Token you want to get string from
     */
    static getString(token: string[]){
        return token[0]
    }

     /**
     * @type {Function} Get the duration you set for your token
     * @param token - Token you want to get duration from
     */
    static getDate(token: string[]){
        return parseInt(token[1])
    }

}

export { TempToken };