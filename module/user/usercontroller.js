const express = require('express');
const Joi = require('joi');

const router = express.Router();
const userService = require('./userservice');
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);


module.exports = router;



function validateAuth(auth){
    const schema={
        username:Joi.string().required(),
        password:Joi.string().required()
    }

    return Joi.validate(auth,schema) 
}


function validateUser(user){
    const schema={
        username:Joi.string().required(),
        password:Joi.string().min(6).required(),
        firstName:Joi.string().min(3).required(),
        lastName:Joi.string().min(3).required()
    }
    return Joi.validate(user,schema)
}

async function authenticate(req, res, next) {

    const {error} =validateAuth(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
    let response =await userService.authenticate(req.body)
    if(response){
        res.status(200).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    } 
}



async function register(req, res, next) {
    const {error} =validateUser(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }

   let response = await userService.create(req.body)
    if(response){
        res.status(200).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }   
}
