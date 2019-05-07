import crypto from 'crypto';
import fs from 'fs';

export default class cryptoFile {
    getCheckSum(filePath, algorithm) {
        return new Promise((resolve, reject) => {
            const shasum = crypto.createHash(algorithm || 'md5');
            try {
                const s = fs.ReadStream(filePath);
                s.on('data', (data) => {
                    shasum.update(data);
                });
                s.on('end', () => {
                    const hash = shasum.digest('hex');
                    return resolve(hash);
                });
            } catch (error) {
                return reject(new Error('calc fail'));
            }
        });
    }
}
