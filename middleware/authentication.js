const { UnauthenticatedError } = require("../errors");
const {verify} = require("jsonwebtoken")
const authenticate = function(req,res,next){
    if(!req.headers.authorization){
        throw new UnauthenticatedError("token not provided")
    }
    const {userId,name} = verify(req.headers.authorization.split(" ")[1],process.env.JWT_SECRET);
    if(!userId){
        throw new UnauthenticatedError("Invalid Token Permisiion Denied")
    }
    req.createdBy = userId;
    next();
}

module.exports = authenticate;