# temp-token
![npm](https://img.shields.io/npm/v/temp-token)
![npm](https://img.shields.io/npm/dt/temp-token)
![NPM](https://img.shields.io/npm/l/temp-token)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/EvilBrain/temp-token)

## Installation
Install it using [npm](https://www.npmjs.com/package/temp-token) :
```cmd
$ npm install temp-token
```
Or install using [yarn](https://yarnpkg.com/package/temp-token) :
```cmd
$ yarn add temp-token
```
## Getting started
Import module with this code :
```js
var tempToken = require('temp-token');
```
And create new TempToken class :
```js
var token = new tempToken.TempToken("your_secret_key");
```
## Usage
Make a temporary token with this function :
```js
token.make("your_token", 1800000); //time in ms
```
Check the token is valid :
```js
token.checkToken("your_temp_token");
//if the token is valid, then it returns true
//otherwise it returns false
```
