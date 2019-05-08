import crypto from 'crypto';
import fs from 'fs';

/**
 * Class to crypto a file.
 */
export default class cryptoFile {

    /**
     * Get the file's checksum.
     * @param {string} filePath the file path.
     * @param {string} algorithm encryption type.
     * @returns {string} checksum value.
     */
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
