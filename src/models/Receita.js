const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Receita = db.define('receitas', {
    cpf_paciente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataprescricao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    crm_medico: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true, // Evita que o Sequelize renomeie a tabela
});

module.exports = Receita;
