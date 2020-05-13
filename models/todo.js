const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const todoSchema=new Schema({
    todoItem:{type:String,required:true},
    status:{type:Boolean,default:false},
    userId:{type:Schema.Types.ObjectId,ref:'User',index:true,required:true},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Todo',todoSchema);