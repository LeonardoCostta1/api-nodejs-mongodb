const mongoose = require('mongoose')

const bcrypt = require('bcrypt');

const userScheama = new mongoose.Schema({
    name:{ 
        type:String, 
        require:true 
    },
    username:{
        type:String, 
    }, 
    email:{
        type:String, 
        require:true 
    },
    password:{
        type:String, 
        require:true
    },
    photo:{
        type:String, 
    },
    description:{
        type:String, 
    },
    notification:{
        type:String,
    },
    bio:{
        type:String,
    },
    website:{
        type:String,
    },
    createdAt:{ 
        type: Date,  
        default: Date.now 
    } 
});

userScheama.pre('save', function(next){

    let user = this;
    
    if(!user.isModified('password')) return next()

    bcrypt.hash(user.password, 10,(err, encrypted)=>{
        user.password = encrypted
        return next()
    });
});
module.exports = mongoose.model("User",userScheama);
