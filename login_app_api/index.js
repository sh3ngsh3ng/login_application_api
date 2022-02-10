const express = require("express")
const MongoUtil = require("./MongoUtil.js")
const cors = require('cors')
require("dotenv").config()
const hashPassword = require("./utils")


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

    // for loading page
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
                console.log("success")
                


            },
            'error': (form) => {
                res.send({
                    'message': "Sign Up Failed. Try again."
                })
            }
        })

        // let data = req.body
        // let username = data.username
        
        // console.log("Called")
        // console.log(req.body)
        // res.send(true)

        // check fields -> validation

        // if valid -> create user


        // if not valid -> send back error


    })

    // login route
    app.post("/login", async(req,res) => {
        let db = MongoUtil.getDB()

        // if user found -> let user login

        // if not found -> deny login


    })





}

main()


app.listen(3000, () => {
    console.log("Server Started")
})