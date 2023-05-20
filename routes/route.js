const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController')
const tiketsController =require('../controllers/tiketsController')
const authentication =require('../middlewares/auth')

router.get('/test', function(req, res){
    res.status(200).send({status: true, message: "test api working fine"})
})

router.post('/ragistration', userControllers.register)
router.post('/login', userControllers.login);

router.post('/create-tickes',authentication.authentication, tiketsController.createTikets );
router.get('/get-tikets',authentication.authentication,tiketsController.getTikets);
router.get('/get-tikets/:id',authentication.authentication,tiketsController.gettiketsbyid);

module.exports = router;