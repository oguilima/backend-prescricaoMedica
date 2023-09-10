const path = require('path');
const Paciente = require(path.resolve(__dirname, '../models/Paciente'));
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const checkToken = require(path.resolve(__dirname, '../helpers/check-token'));

// Função para criar um novo paciente
const create = async (req, res) => {
  try {

    console.log("\n\n\n\n\n DEBUGANDO \n\n\n\n\n")
    console.log(req.body.datanascimento)
    console.log(req.body)


    const { cpf, senha } = req.body;
    const strCpf = cpf.toString()
    
    const validaPacienteExistente = await Paciente.findOne({ where: { cpf: strCpf } });
    
    if (validaPacienteExistente) {
      res.status(422).json({ message: "Paciente já cadastrado" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const senhaCripografada = await bcrypt.hash(senha, salt);
    req.body.senha = senhaCripografada;

    const novoPaciente = await Paciente.create(req.body);
    res.status(201).json(novoPaciente);
  } catch (err) {
    
    res.status(400).json({ erro: err.message });
  }
};

const findAll = async (req, res, next) => {
  const validaToken = checkToken(req, res, next);

  if (validaToken.status === 401) {
    res.status(validaToken.status).json({ message: validaToken.mensagem });
    return;
  }

  try {
    const pacientes = await Paciente.findAll({
      attributes: ['cpf', 'nome', 'datanascimento'],
    });
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Função para obter informações de um Paciente pelo CPF
const findByCPF = async (req, res, next) => {
  try {
    const validaToken = checkToken(req, res, next);

    if (validaToken.status === 401) {
      res.status(validaToken.status).json({ message: validaToken.mensagem });
      return;
    }

    const { cpf } = req.params;
    const paciente = await Paciente.findOne({ where: { cpf }, attributes: ['cpf', 'nome', 'datanascimento'], });

    if (!paciente) {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    res.status(200).json(paciente);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const find = async (req, res, next) => {
  try {
    const validaToken = checkToken(req, res, next);

    if (validaToken.status === 401 || validaToken.status == 400) {
      res.status(validaToken.status).json({ message: validaToken.mensagem });
      return;
    }

    const { cpf, nome, datanascimento } = req.query;
    const conditions = {};

    if (cpf) {
      conditions.cpf = cpf;
    }

    if (nome) {
      conditions.nome = { [Op.like]: `%${nome}%` };
    }

    if (datanascimento) {
      conditions.datanascimento = datanascimento;
    }

    const pacientes = await Paciente.findAll({
      where: conditions,
      attributes: ['cpf', 'nome', 'datanascimento'],
    });

    if (!pacientes || pacientes.length === 0) {
      return res.status(404).json({ erro: 'Pacientes não encontrados' });
    }

    res.status(200).json(pacientes);
  } catch (err) {
    res.status(400).json({ erro: "Token invalido" });
  }
};

// Função para excluir um Paciente pelo CPF
const del = async (req, res, next) => {
  try {
    const validaToken = checkToken(req, res, next);

    if (validaToken.status === 401) {
      res.status(validaToken.status).json({ message: validaToken.mensagem });
      return;
    }

    const { cpf } = req.params;
    const excluido = await Paciente.destroy({ where: { cpf } });

    if (excluido) {
      return res.status(200).json({ mensagem: 'Paciente excluído com sucesso' });
    }

    return res.status(404).json({ erro: 'Paciente não encontrado' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

module.exports = {
  create,
  findAll,
  findByCPF,
  find,
  delete: del,
};
