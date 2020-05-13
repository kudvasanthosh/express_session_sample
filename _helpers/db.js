const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URL,{ useCreateIndex: true, useNewUrlParser: true ,useUnifiedTopology: true })

module.exports={
    User:require('../models/user'),
    Todo:require('../models/todo'),
}