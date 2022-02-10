const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode")

const checkIfAuthenticatedJWT = (req,res,next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("Forbidden")
                return res.sendStatus(403)
            } else {
                next()
            }
        })
    } else {
        res.sendStatus(401)
    }
}


const checkIfManagerRole = (req,res,next) => {
    console.log("manager mw called")
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        let userDetails = jwt_decode(token)
        if (userDetails.role == "manager") {
            next()
        } else {
            res.sendStatus(401) // unauthorized
        }
    }
}

module.exports = {
    checkIfAuthenticatedJWT,
    checkIfManagerRole
}
