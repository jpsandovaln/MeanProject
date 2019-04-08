const crypto = require('crypto');
const fs= require('fs');

module.exports = class cryptoFile {
    constructor(){

    }

    getCheckSum(filePath, algorithm) {
        return new Promise((resolve, reject) => {
            // Algorithm depends on availability of OpenSSL on platform
            // Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
            let shasum = crypto.createHash(algorithm || 'md5');
            try {
                let s = fs.ReadStream(filePath)
                s.on('data', function (data) {
                    shasum.update(data)
                })
                // making digest
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
