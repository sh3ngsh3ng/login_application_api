const express = require("express")
const MongoUtil = require("./MongoUtil.js")
const cors = require('cors')
require("dotenv").config()
const {hashPassword, generateAccessToken} = require("./utils")


let app = express()

// Enable processing JSON data
app.use(express.json());

// Enable CORS
app.use(cors())

// Enable Forms
app.use(
    express.urlencoded({
        extended: false
    })
)

// forms
const {createRegistrationForm} = require("./forms")

async function main() {
    await MongoUtil.connect(process.env.MONGO_URI, 'login_app')

    // loading page (wait for api to start up)
    app.get('/', async (req,res) => {
        let db = MongoUtil.getDB()
        let result = await db.collection("users").find().toArray()
        console.log(result)
        res.send({
            "live": true
        })
    })

    // sign up route
    app.post("/sign-up", async(req,res) => {
        console.log("Called Sign-Up route")
        let db = MongoUtil.getDB()

        // user's data
        let signUpData = req.body.form

        // form template
        const registerForm = createRegistrationForm()

        // handle form
        registerForm.handle(signUpData, {
            'success': async(form) => {
                // create user on mongo
                console.log("Form is valid, creating user")
                let {confirm_password, password, ...fields} = form.data
                password = hashPassword(password)
                let result = await db.collection('users').insertOne({
                    ...fields,
                    password
                })
                console.log("User created")
                res.send({
                    "success": true,
                    "message": "Sign up successful!"
                })
            },
            'error': (form) => {
                console.log("Form is invalid")
                res.send({
                    "success": false,
                    'message': "Sign up failed. Try again."
                })
            }
        })
    })

    // login route
    app.post("/login", async(req,res) => {
        let db = MongoUtil.getDB()
        let username = req.body.form.username
        let password = req.body.form.password


        // check whether user present in mongodb
        let user = await db.collection("users").findOne({username})
 
        // user present and password correct (will not work if more than 1 same username)
        if (user && (user.password == hashPassword(password))) {
            let accessToken = generateAccessToken(user)
            if (accessToken) {
                res.send({
                    "accessToken": accessToken,
                    "message": "success"
                })
            }
        } else {
            res.send({
                "message": "failed"
            })
        }


    })





}

main()


app.listen(3000, () => {
    console.log("Server Started")
})