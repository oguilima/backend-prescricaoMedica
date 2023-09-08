const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const MedicamentosReceitas = db.define('medicamentos_receitas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo_medicamento: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'medicamentos', // Nome da tabela de medicamentos
            key: 'codigo', // Nome da coluna de referência
        },
    },
    id_receita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'receitas', // Nome da tabela de receitas
            key: 'id', // Nome da coluna de referência
        },
    }
});

module.exports = MedicamentosReceitas;
