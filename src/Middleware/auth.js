const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const auth = (request,response,next)=>{

    const token = request.headers.auth;

    if(!token) return response.send({error:'error to authenticate token'});

    jwt.verify(token,process.env.TOKEN,(err,decode)=>{

        if(err) return response.send({err:'Invalid Token'});

        return next()
    })
}
module.exports = auth;
