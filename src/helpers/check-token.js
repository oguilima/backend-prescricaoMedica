const jwt = require("jsonwebtoken");

// middleware to validate token
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  try {
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {

      return {
        status: 401,
        mensagem: "Não foi informado o token"
      }

    }


    const verified = jwt.verify(token, "secretpersonalizado");


    if (verified) {
      return {
        status: 200,
        mensagem: "Token valido"
      }
    } else {
      return {
        status: 401,
        mensagem: "Token Invalido"
      }
    }

  } catch (err) {
    return {
      status: 400,
      mensagem: "Token Invalido"
    }
  }
};

module.exports = checkToken;
