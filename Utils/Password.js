const bcrypt = require('bcryptjs');

const generatePassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}

const checkPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        })
    })

}



module.exports = { generatePassword, checkPassword };