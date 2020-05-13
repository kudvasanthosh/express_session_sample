const db=require('../../_helpers/db');
const Todo= db.Todo;

module.exports={
  getAll,
  getById,
  create,
  update,
  delete:removeItem
}


async function getAll(queryParam,userId) {
    let page=1;
    let numRecords=5;
    let matchQuery={};

   if(queryParam.page){
      page=parseInt(queryParam.page)
   }

   if(queryParam.numRecords){
    numRecords=parseInt(queryParam.numRecords)
   }

   let skip= (page-1)*numRecords;

    if(queryParam.todoItem){
        matchQuery.todoItem={  $regex: queryParam.todoItem, $options: "i"}
    }

    if(queryParam.status){
        matchQuery.status={  $eq: queryParam.status}
    }

    if(userId){
        matchQuery.userId={  $eq: userId }
    }

    let todoitems= await Todo.find(matchQuery).limit(numRecords).skip(parseInt(skip))

    if(!todoitems){
        return{"status":400,"message":"failed to fetch todo items"} ;
    }
    else{
        return{"status":200,"data":todoitems} ;
    }
}

async function getById(id){
    try{
        let todo = await Todo.findById(id);
         
        if(!todo){
            return{"status":404,"message":"item not found"} ;
           
        }
        else{
            return{"status":200,data:todo} ; 
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }
  
}

async function create(toDoItem){
    try{
        const todo= new Todo(toDoItem);
        let todoObj=await todo.save();
        if(!todoObj){
            return { "status":200, "message":"failed to create to do item"}     
        }
        else{
            return { "status":200, "data":todoObj}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }     
}

async function update(id,todoItem){
    try{    
        const todo = await Todo.findById(id);

        // validate
        if (!todo) return { "status":404,"message":`todo item not found`}

        // copy courseParam properties to course
        Object.assign(todo, todoItem);

        let todoObj=await todo.save();
        // save user
        if(!todoObj){
            return {"status":400,"message":"failed to update todo"}
        }else{
            return {"status":200,"data":todoObj}  
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }   
}

async function removeItem(id){
    try{    
        let todoObj= await Todo.findByIdAndRemove(id);
        if(!todoObj){
            return {"status":400,"message":"failed to delete todo"}
        }else{
            return {"status":200,"message":"todo deleted sucessfully"}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }     
}

