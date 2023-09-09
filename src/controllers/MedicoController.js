const path = require('path');
const Medico = require(path.resolve(__dirname, '../models/Medico'));
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const createUserToken = require(path.resolve(__dirname, '../helpers/create-user-token'));

const getMedicoByToken = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(401).json({ error: "Token nao informado!" });
    }
    // find Medico
    const decoded = jwt.verify(token, "secretpersonalizado");

    const crm = decoded.crm;

    const medico = await Medico.findOne({
      where: { crm: crm },
      attributes: ['crm', 'nome', 'datanascimento']
    });

    res.status(200).json(medico);
  } catch (err) {
    res.status(400).json({ message: "Token invalido" });
  }

};

const create = async (req, res) => {
  try {
    const { crm } = req.body;
    const validaMedicoExistente = await Medico.findOne({ where: { crm } });

    if (validaMedicoExistente) {
      res.status(422).json({ message: "Médico já cadastrado" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const reqSenha = req.body.senha;
    const senhaCripografada = await bcrypt.hash(reqSenha, salt);
    req.body.senha = senhaCripografada;

    const novoMedico = await Medico.create(req.body);
    await createUserToken(novoMedico, req, res);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Função para listar todos os médicos
const findAll = async (req, res) => {
  try {
    const medicos = await Medico.findAll({
      attributes: ['crm', 'nome', 'datanascimento'],
    });
    res.status(200).json(medicos);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Função para obter informações de um médico pelo CRM
const findByCRM = async (req, res) => {
  try {
    const { crm } = req.params;
    const medico = await Medico.findOne({ where: { crm } });

    if (!medico) {
      return res.status(404).json({ erro: 'Médico não encontrado' });
    }

    res.status(200).json(medico);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Função para excluir um médico pelo CRM
const del = async (req, res) => {
  try {
    const { crm } = req.params;
    const excluido = await Medico.destroy({ where: { crm } });

    if (excluido) {
      return res.status(200).json({ mensagem: 'Médico excluído com sucesso' });
    }

    return res.status(404).json({ erro: 'Médico não encontrado' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const login = async (req, res) => {
  const { crm, senha } = req.body;

  if (!crm || !senha) {
    res.status(400).json({ erro: "O Crm ou a senha não foram informados" });
    return;
  }

  const medico = await Medico.findOne({ where: { crm } });

  if (!medico) {
    res.status(400).json({ erro: "Usuário não encontrado" });
    return;
  }

  const passwordMatch = bcrypt.compareSync(senha, medico.senha);

  if (!passwordMatch) {
    res.status(401).json({ erro: "Senha incorreta!" });
    return;
  }

  await createUserToken(medico, req, res);
};

module.exports = {
  create,
  findAll,
  findByCRM,
  getMedicoByToken,
  login,
  delete: del,
};
