const express =require('express');
const Joi = require('joi');
const router= express.Router();
const todoService=require('./todoService');
const utils=require('../../_helpers/utils');

router.get('/',getAll);
router.get('/:id',getByID);
router.post('/',addTodo)
router.put('/:id',update);
router.delete('/:id',removeItem);

module.exports=router;

function validateTodoItem(todo){
    const schema={
        todoItem :Joi.string().min(3).required(),
        status:Joi.boolean()
    }

    return Joi.validate(todo,schema)
   
}


async function getAll(req,res){
    let { sub }=utils.decodeHeader(req.headers.authorization);
    let response=await todoService.getAll(req.query,sub)
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function getByID(req,res){
    if(!req.params.id){
        res.status(400).send({"message":" id param is missing"});
        return;
    }
   let response= await todoService.getById(req.params.id);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function addTodo(req,res){
    let { sub }=utils.decodeHeader(req.headers.authorization);
    const {error} =validateTodoItem(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
    req.body.userId=sub;
    let response=await todoService.create(req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function update(req,res){
    let { sub }=utils.decodeHeader(req.headers.authorization);
    const {error} =validateTodoItem(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
    req.body.userId=sub;
    let response=await todoService.update(req.params.id,req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }  
}

async function removeItem(req,res){
    let response= await todoService.delete(req.params.id);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}


