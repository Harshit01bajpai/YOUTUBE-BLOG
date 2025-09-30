const JWT=require("jsonwebtoken");

const secret="h@r$hit@9695";


function createTokenForUser(user){

    const payload={
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    }

    

    const token= JWT.sign(payload,secret);
     return token;
}

function verifyToken(token) {
  try {
    const decoded = JWT.verify(token, secret);
    return decoded; // agar valid hoga to user payload return karega
  } catch (err) {
    return null; // agar token galat/expired hoga to null return hoga
  }
}
module.exports = { createTokenForUser,verifyToken};