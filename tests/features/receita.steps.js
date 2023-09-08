const { Given, When, Then } = require('cucumber');
const request = require('supertest');
const app = require("../../../index"); 


Given('o CPF do paciente {string}', function (cpfPaciente) {
  this.cpfPaciente = cpfPaciente;
});

Given('o CRM do médico {string}', function (crmMedico) {
  this.crmMedico = crmMedico;
});

Given('os códigos de medicamentos {string}, {string}', function (codigo1, codigo2) {
  this.codigosMedicamentos = [codigo1, codigo2];
});

Given('a data de prescrição {string}', function (dataPrescricao) {
  this.dataPrescricao = dataPrescricao;
});

When('eu faço uma solicitação POST para {string}', async function (url) {
  const requestBody = {
    cpfPaciente: this.cpfPaciente,
    crmMedico: this.crmMedico,
    codigosMedicamentos: this.codigosMedicamentos,
    dataPrescricao: this.dataPrescricao,
  };

  this.response = await request(app)
    .post(url)
    .send(requestBody);
});

Then('a resposta deve ter status {int}', function (status) {
  expect(this.response.status).to.equal(status);
});

Then('a resposta deve conter {string}', function (message) {
  expect(this.response.text).to.include(message);
});
