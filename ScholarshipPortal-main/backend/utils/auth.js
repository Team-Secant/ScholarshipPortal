const Jwt = require("jsonwebtoken");
const crypto =  require("crypto");

const createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return Jwt.sign(payload, "process.env.TOKEN_SECRET", {
      expiresIn: duration,
   });
};

const generateVerificationToken = () => {
   const buffer = crypto.randomBytes(20);
   return buffer.toString('hex');
};

module.exports = generateVerificationToken