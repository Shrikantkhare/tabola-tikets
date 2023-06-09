const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")
const validator = require('validator')
const isValid = function (value) {
    if (typeof (value) === 'undefined' || value === null) return false
    if (typeof (value) === 'string' && value.trim().length == 0) return false
    return true
}
let EmailRegex = /^[A-Za-z]{1}[A-Za-z0-9._]{1,}@[A-Za-z]{2,15}[.]{1}[a-z.]{2,5}$/
let Passwordregex = /^[A-Z0-9a-z]{1}[A-Za-z0-9.@#$&]{7,14}$/

const register = async function (req, res) {
    try {
        const data = req.body;
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "no data provided" })
        }
       
        if (!isValid(data.phone)) {
            return res.status(400).send({ status: false, msg: "phone is required" })
        }
        if (!isValid(data.email)) {
            return res.status(400).send({ status: false, msg: "email is required" })
        }
        if (!EmailRegex.test(data.email)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid email" })
        }

        if (!isValid(data.password)) {
            return res.status(400).send({ status: false, msg: "password is required" })
        }
        if (!Passwordregex.test(data.Password)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid pass" })
        }
        if (!(data.password.length >= 8 && data.password.length <= 15)) {
            return res.status(400).send({ status: false, msg: "password length b/w 8-15" })
        }

        const duplicateNumber = await userModel.findOne({ phone: data.phone })
        if (duplicateNumber) return res.status(400).send({ status: false, msg: 'number already exist' })

        const duplicateEmail = await userModel.findOne({ email: data.email })
        if (duplicateEmail) return res.status(400).send({ status: false, msg: 'email already exist' })

        const userCreated = await userModel.create(data);
        res.status(201).send({ status: true, message: "User created successfully", data: userCreated })

    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}
const login = async function (req, res) {
    try {
        const data = req.body
        // validations
        if (Object.keys(data) == 0)
            return res.status(400).send({ status: false, msg: "Bad Request, No data provided" })

        if (!isValid(data.email)) {
            return res.status(400).send({ status: false, msg: "Email is required" })
        }
        if (!isValid(data.password)) {
            return res.status(400).send({ status: false, msg: "Password is required" })
        };;


        const userMatch = await userModel.findOne({ email: data.email, password: data.password })
        if (!userMatch) return res.status(400).send({ status: false, msg: "Email or Password is incorrect" })

        const token = jwt.sign({
            userId: userMatch._id,
        }, "tambola-tikets", { expiresIn: "70h" })
        return res.status(200).send({ status: true, msg: "You are successfully logged in", token })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}



module.exports.register = register,
module.exports.login = login

