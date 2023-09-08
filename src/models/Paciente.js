const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Paciente = db.define('paciente', {
    cpf: {
        type: DataTypes.STRING,
        allowNull: false, 
        primaryKey: true, // Define o campo CPF como chave primária
        autoIncrement: false, // Evita a autoincrementação do valor da chave primária
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    datanascimento: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Paciente;