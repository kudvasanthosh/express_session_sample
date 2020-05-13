require('dotenv').config();
const express = require('express');
const jwt=require('express-jwt');
const bodyParser=require('body-parser');
const errorHandler=require('./_helpers/error-handler');
const http = require('http');
const app = express()
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit:'1mb'}));

//CORS
app.use( (req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, authorization, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(jwt({ secret: process.env.SECRET }).unless({
    path: ['/','/users/authenticate','/users/register']
}));

app.use(errorHandler);
app.get('/', (req, res) => {
    res.send({"message":"Api server"})
})
app.use('/todos',require('./module/todo/todoController'));
app.use('/users',require('./module/user/usercontroller'));

const port=process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Listening on port  ${process.env.PORT}`);
});