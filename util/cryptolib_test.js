var cypto = require('./cryptolib.js');
var CFG = require('../config');
const assert = require('assert').strict;
var signStr = '';

describe('加密解密', () => {
    it("加密", done => {
        var sign = cypto.genSign("helloWorld", CFG.key, CFG.iv);
        console.log(sign);
        signStr = sign;
        assert.strictEqual(sign, '609eecc190f97a8098e2adec857dae36');
        done();
    }).timeout(1000000);;

    it("解密", done => {
        var src = cypto.deSign(signStr, CFG.key, CFG.iv);
        console.log(src);
        assert.strictEqual(src, 'helloWorld');
        done();
    }).timeout(1000000);;
});