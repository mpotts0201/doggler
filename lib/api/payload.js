import crypto from "lib/utils/crypto";

export default class Payload {

    static generate_secret = () => {
        const key = crypto.randomBytes(32);
        return key.toString('hex')
    }

    static decrypt = (payload, secret) => {
        // base64 decoding
        const enc = Buffer.from(payload, 'base64');
        const key = Buffer.from(secret, 'hex');

        // convert data to buffers
        const iv = enc.slice(0, 16);
        const tag = enc.slice(16, 32);
        const text = enc.slice(32);

        try {
            const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
            decipher.setAuthTag(tag);
            decipher.setAAD(Buffer.from("AES256GCM", 'utf8'))
            // encrypt the given text
            return decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');
        } catch (e) {
            return null
        }
    };

    static decryptJSON = (payload, secret) => {
        try {
            const result = Payload.decrypt(payload, secret);
            return JSON.parse(result)
        } catch (e) {
            return null
        }
    };

    static encrypt = (text, secret) => {
        const iv = crypto.randomBytes(16);
        const key = Buffer.from(secret, 'hex');

        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        cipher.setAAD(Buffer.from("AES256GCM", 'utf8'));

        const cipher_text = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();
        const encrypted = Buffer.concat([iv, tag, cipher_text]);
        return encrypted.toString('base64')
    };

    static encryptJSON = (data, secret) => {
        const text = JSON.stringify(data);
        return Payload.encrypt(text, secret)
    }
}
