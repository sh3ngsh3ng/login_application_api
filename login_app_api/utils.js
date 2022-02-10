const crypto = require('crypto')
const jwt = require("jsonwebtoken")


const hashPassword = (password) => {
    const md5 = crypto.createHash('md5')
    const hash = md5.update(password).digest('base64')
    return hash
}

const generateAccessToken = (user) => {
    return jwt.sign({
        'username': user.username,
        'email': user.email,
        'role': user.role
    }, process.env.TOKEN_SECRET, {
   expiresIn: "1hr"
})
}


module.exports = {
    hashPassword, generateAccessToken
}
