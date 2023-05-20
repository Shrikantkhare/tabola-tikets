const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
    try {
        const token = req.headers["x-api-key"];
        // console.log(token)
        if (!token) {
            return res.status(400).send({ status: false, msg: "login is required, token set in header" })
        }
        const decodedtoken = jwt.verify(token, "tambola-tikets")
        if (!decodedtoken) {
            return res.status(400).send({ status: false, msg: "you are not authenticate" })
        }
        next();
    }
    
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.authentication = authentication


 