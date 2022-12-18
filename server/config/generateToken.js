const jwt = require("jsonwebtoken");

const secret="smelly";
const expiration = "2h";

module.exports = generateToken = ({ email, _id }) => {
  signToken: {
    const payload = { email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
}
