const Sequelize = require('sequelize');


//AVALIADOR POR GENTILEZA ALTERAR ESSAS INFORMAÇÕES
const dadosBanco = {
    nomeDb: "postgres",
    usuario: "postgres",
    senha: "12345",
    host: "localhost",
    dialect: "postgres",
    port: 5432
}

const sequelize = new Sequelize(dadosBanco.nomeDb, dadosBanco.usuario, dadosBanco.senha, {
    host: dadosBanco.host,
    dialect: dadosBanco.dialect,
    port: dadosBanco.port,
    define: {
        timestamps: false,
    },
});

// Exporte a instância do Sequelize
module.exports = sequelize;
