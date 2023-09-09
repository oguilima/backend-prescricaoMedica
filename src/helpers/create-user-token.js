const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
    const token = jwt.sign(
        {
            nome: user.nome,
            crm: user.crm,
        },
        "secretpersonalizado",
        {
            expiresIn: "3600s" // Define o tempo de expiração para 3600 segundos (1 hora)
        }
    );

    // return token
    res.status(200).json({
        message: "Você está autenticado!",
        token: token
    });
};

module.exports = createUserToken;
