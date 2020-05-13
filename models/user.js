const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const Userschema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    profilePic: { type: String},
    lastName: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isActive:{ type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', Userschema);