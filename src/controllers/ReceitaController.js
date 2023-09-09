const path = require('path');
const Paciente = require(path.resolve(__dirname, '../models/Paciente'));
const Medico = require(path.resolve(__dirname, '../models/Medico'));
const Medicamento = require(path.resolve(__dirname, '../models/Medicamento'));
const Receita = require(path.resolve(__dirname, '../models/Receita'));
const MedicamentosReceitas = require(path.resolve(__dirname, '../models/MedicamentosReceitas'));
const { Op } = require('sequelize');

const checkToken = require(path.resolve(__dirname, '../helpers/check-token'));

const getHistoricoPorCpf = async (req, res, next) => {
  const validaToken = checkToken(req, res, next);

  if (validaToken.status === 401) {
    res.status(validaToken.status).json({ message: validaToken.mensagem });
    return;
  }

  const { cpf } = req.query;

  if (!cpf) {
    return res.status(404).json({ message: 'Histórico não encontrado.' });
  }

  const receita = await Receita.findAll({ where: { cpf_paciente: cpf } });

  if (!receita) {
    return res.status(404).json({ message: 'Histórico não encontrado.' });
  }

  res.status(200).json(receita);
};

const getMedicamentosReceitaPid = async (req, res, next) => {
  try {
    const validaToken = checkToken(req, res, next);

    if (validaToken.status === 401) {
      res.status(validaToken.status).json({ message: validaToken.mensagem });
      return;
    }

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'ID da receita não fornecido.' });
    }

    const medicamentos = await MedicamentosReceitas.findAll({ where: { id_receita: id } });

    if (!medicamentos.length) {
      return res.status(404).json({ message: 'Nenhum medicamento encontrado para esta receita.' });
    }

    const arrCodMed = medicamentos.map(med => med.codigo_medicamento);

    const nomeMedicamentos = await Medicamento.findAll({
      where: {
        codigo: {
          [Op.in]: arrCodMed
        }
      }
    });

    res.status(200).json(nomeMedicamentos);
  } catch (error) {
    console.error('Erro na função getMedicamentosReceitaPid:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

const createReceita = async (req, res, next) => {
  try {

    const validaToken = checkToken(req, res, next);

    if (validaToken.status === 401) {
      res.status(validaToken.status).json({ message: validaToken.mensagem });
      return;
    }

    const { cpfPaciente, crmMedico, codigosMedicamentos, dataPrescricao } = req.body;
    
    const strCpfPaciente = cpfPaciente.toString()
    const strCrmMedico = crmMedico.toString()
    const strDataPrescricao = dataPrescricao.toString()
    let arrMedicamentosStr = []

    //transformar os codigos em str caso venham como integer
    codigosMedicamentos.map((medicamento) => {
      arrMedicamentosStr.push(medicamento.toString())
    })
    

    const paciente = await Paciente.findOne({ where: { cpf: strCpfPaciente } });
    const medico = await Medico.findOne({ where: { crm: strCrmMedico } });
    const medicamentos = await Medicamento.findAll({ where: { codigo: arrMedicamentosStr } });

    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado.' });
    }

    if (!medico) {
      return res.status(404).json({ message: 'Médico não encontrado.' });
    }

    if (medicamentos.length !== codigosMedicamentos.length) {
      return res.status(404).json({ message: 'Alguns medicamentos não foram encontrados.' });
    }

    // Crie a receita
    const receita = await Receita.create({
      cpf_paciente: strCpfPaciente,
      crm_medico: strCrmMedico,
      dataprescricao: strDataPrescricao,
    });

    const medicamentosReceitasData = medicamentos.map((medicamento) => ({
      id_receita: receita.id.toString(),
      codigo_medicamento: medicamento.codigo.toString(),
    }));

    //inclui os medicamentos na receita
    await MedicamentosReceitas.bulkCreate(medicamentosReceitasData);

    res.status(201).json({ message: 'Receita criada com sucesso.' });
  } catch (err) {

    res.status(500).json({ error: 'Erro ao criar a receita.' });
  }
};

module.exports = {
  createReceita,
  getHistoricoPorCpf,
  getMedicamentosReceitaPid,
};
