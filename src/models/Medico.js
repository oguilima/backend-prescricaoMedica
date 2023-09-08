const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Medico = db.define('medico', {
    crm: {
        type: DataTypes.STRING,
        allowNull: false, 
        primaryKey: true, // Define o campo CRM como chave primária
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

module.exports = Medico;
