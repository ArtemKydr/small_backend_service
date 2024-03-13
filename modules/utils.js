const moment = require('moment');
const crypto = require('crypto');
const uuid = require('uuid');

const passwordSalt = '92jwmjhsa9asbnz203askx';
const tokenSalt = 'nnmz8a;3nsk0anzbgstyd';

const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const getRandomDate = (start, end, format) => {
    return moment(start).add(Math.random() * (moment(end) - moment(start)), 'milliseconds').format(format);
}

const md5 = (val) => {
    return crypto.createHash('md5').update(val).digest('hex');
};

const sha1 = (val, key) => {
    return crypto.createHmac('sha1', key).update(val).digest('hex');
};

const base64 = (val) => {
    return Buffer.from(val).toString('base64');
};

const makePasswordHash = (str) => {
    return module.exports.sha1(passwordSalt + str, passwordSalt);
};

let makeUUID = () => {
    return uuid.v4();
};

const makeToken = () => {
    return sha1(makeUUID(), tokenSalt);
}

const decode = (code) => {
    const bin = code.toString(2);
    return Array.from(bin)
        .reverse()
        .map((char, i) => (+char) * (1 << i))
        .filter(Boolean);
};

module.exports = {
    makePasswordHash,
    base64,
    sha1,
    md5,
    getRandomDate,
    getRandomColor,
    makeToken,
    decode,
}
