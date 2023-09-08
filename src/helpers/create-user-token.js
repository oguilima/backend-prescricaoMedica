const jwt = require("jsonwebtoken");
const { use } = require("../routes/MedicoRoutes");

const createUserToken = async (user, req, res) => {
    const token = jwt.sign(
        // payload data
        {
            nome: user.nome,
            crm: user.crm,
        },
        "secretpersonalizado",
        {
            expiresIn: "2h" // Define o tempo de expiração para 2 horas
        }
    );

    // return token
    res.status(200).json({
        message: "Você está autenticado!",
        token: token
    });
};

module.exports = createUserToken;
