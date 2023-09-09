const path = require('path');
const Medicamento = require(path.resolve(__dirname, '../models/Medicamento'));
const checkToken = require(path.resolve(__dirname, '../helpers/check-token'));


const create = async (req, res, next) => {
    try {
        const validaToken = checkToken(req, res, next);
        
        if (validaToken.status === 401) {
            res.status(validaToken.status).json({ message: validaToken.mensagem });
            return;
        }

        const medicamento = await Medicamento.create(req.body);
        res.status(201).json({ message: `O ${medicamento.nome} foi criado no grupo ${medicamento.categoria}` });

    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};


const findAll = async (req, res, next) => {
    try {
        const validaToken = checkToken(req, res, next);
        
        if (validaToken.status === 401) {
            res.status(validaToken.status).json({ message: validaToken.mensagem });
            return;
        }

        const medicamentos = await Medicamento.findAll();
        res.status(200).json(medicamentos);

    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

module.exports = {
    create,
    findAll
};