import crypto from 'crypto-browserify';

export default {
    createHash: crypto.createHash,
    createECDH: crypto.createECDH,
    createHmac: crypto.createHmac,
    createDecipheriv: crypto.createDecipheriv,
    createCipheriv: crypto.createCipheriv,
    randomBytes: crypto.randomBytes

}
