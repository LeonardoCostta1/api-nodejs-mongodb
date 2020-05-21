const bcrypt = require('bcrypt')
const User = require('../Model/user')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const createToken = (userId)=>{
    return jwt.sign({id:userId},process.env.TOKEN,{expiresIn:'7d'})
}

module.exports={

    async index(request,response){

        await User.find({},(err ,data)=>{
            if(err) return response.send({error:"error to consult user"});

            data.password = undefined;

            return response.json(data)
        })
    },

    async create(request,response){
        const {name,email,password } = request.body;

        if(!name || !email || !password) return response.send({err:'insuficient data'})

        await User.findOne({email},(err,data)=>{
            if(err) return response.send({err:'user wrong'});
            if(data) return response.send({err:'user been registered'});

              User.create(request.body,(err,data)=>{
                if(err) return response.send({err:'error to create user'})
                data.password = undefined;
                return response.send({data,token:createToken(data.id)})
            })
        })
    },

    async authentication(request,response){

        const {email,password} = request.body;

        if(!email || !password) return response.send({err:'insuficient data'})

        await User.findOne({email},(err,data)=>{

            if(err) return response.send({err:'error to find user'})

            if(!data) return response.send({err:'error user not found'})

              bcrypt.compare(password,data.password,(err,same)=>{

                    if(!same) return response.send({err:'error to authenticate'});

                    data.password = undefined;

                    return response.send({data, token:createToken(data.id)})
                })

        }).select('+password');
    }
}