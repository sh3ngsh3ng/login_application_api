const crypto = require('crypto')



const hashPassword = (password) => {
    const md5 = crypto.createHash('md5')
    const hash = md5.update(password).digest('base64')
    return hash
}


module.exports = {
    hashPassword
}
