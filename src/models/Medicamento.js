const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Receita = require("../models/Receita")

const Medicamento = db.define('medicamento', {
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Medicamento.belongsToMany(Receita, { through: 'medicamentos_receitas', foreignKey: 'codigo' });


module.exports = Medicamento;
