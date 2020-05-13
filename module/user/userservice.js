const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');

const User = db.User;

module.exports = {
    authenticate,
    create,
    update
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();

        const token = jwt.sign({ sub: user.id }, process.env.SECRET);
        return {
            status:200,
            ...userWithoutHash,
            token
        };

    } else {
        return {
            status: 400,
            message: 'Username or password is incorrect'
        };
    }

}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        return { "status":400,"message": `Username  ${userParam.username} is already taken` }
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    let savedUser = await user.save();
    if(savedUser){
        return {"status":200,"data":savedUser}
    }
    else{
        return {"status":400,"message":"failed to save user"}
    }
    
}

async function update(id,userData){
    try{    
        const user = await User.findById(id);

        // validate
        if (!user) return { "status":404,"message":`user  not found`}
         
        // copy userParam properties to user
        Object.assign(user, userData);

        let userObj=await user.save();
        // save user
        if(!userObj){
            return {"status":400,"message":"failed to update user details"}
        }else{
            return {"status":200,"data":userObj}  
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }   
}
