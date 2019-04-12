import crypto from 'crypto';
import fs from 'fs';

export default class cryptoFile {
    getCheckSum(filePath, algorithm) {
        return new Promise((resolve, reject) => {
            let shasum = crypto.createHash(algorithm || 'md5');
            try {
                let s = fs.ReadStream(filePath)
                s.on('data', function (data) {
                    shasum.update(data)
                })
                s.on('end', function () {
                    const hash = shasum.digest('hex')
                   return resolve(hash);
                })
            } catch (error) {
                return reject('calc fail');
            }
        });
      }
}
