const request = require('supertest');
const app = require('../index');
const dotenv = require('dotenv');
const { AfterAll } = require('@cucumber/cucumber');

dotenv.config({ path: '.env.testes' });


function generateRandomCode() {
    const maxDigits = 1000000; // 10^8
    return Math.floor(Math.random() * maxDigits);
}


let token = ""
let crmPTeste = ""
let cpfPaciente = ""
let codigoMedicamento = ""


// TESTES MEDICOS
beforeAll(async () => {
    crmPTeste = generateRandomCode()
    const response = await request(app)
        .post('/v1/medicos/create')
        .send({
            crm: 'CRM/SP' + crmPTeste,
            nome: "Médico Teste",
            senha: '12345',
            datanascimento: "24/04/2001"
        });

    token = JSON.parse(response.text).token;
});


describe('Rota /v1/medicos/token/:token', () => {
    it('Deve buscar o médico com sucesso', async () => {

        

        const response = await request(app)
            .get(`/v1/medicos/token/${token}`);

        expect(response.status).toBe(200);
    });
});




describe('Rota /v1/medicos/login', () => {
    it('Deve realizar o login com sucesso', async () => {

        const response = await request(app)
            .post('/v1/medicos/login')
            .send({
                crm: 'CRM/SP' + crmPTeste,
                senha: '12345'

            });

        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Você está autenticado!');
    });
});


describe('Rota /v1/medicos/listAll', () => {
    it('Deve buscar todos os médicos com sucesso', async () => {

        const response = await request(app)
            .get(`/v1/medicos/listAll`);

        expect(response.status).toBe(200);
    });
});

describe('Rota /v1/medicos/:crm', () => {
    it('Deve buscar o médico com sucesso', async () => {
        const crm = "CRM/SP" + crmPTeste;
        const encodedCrm = encodeURIComponent(crm);

        const response = await request(app)
            .get(`/v1/medicos/${encodedCrm}`);

        expect(response.status).toBe(200);
    });
});









//TESTES MEDICAMENTOS
describe('Rota /v1/medicamento/create', () => {
    it('Deve criar um medicamento com sucesso', async () => {
        codigoMedicamento = generateRandomCode(); // Gere um código aleatório com até 8 dígitos

        const response = await request(app)
            .post('/v1/medicamento/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                codigo: codigoMedicamento,
                nome: 'Medicamento Teste',
                categoria: 'Categoria Teste',
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toContain('foi criado no grupo');
    });
});


describe('Rota /v1/medicamento/findAll', () => {
    it('Deve criar um medicamento com sucesso', async () => {

        const response = await request(app)
            .get('/v1/medicamento/findAll')
            .set('Authorization', `Bearer ${token}`)


        expect(response.status).toBe(200);
    });
});










//TESTES PACIENTES


describe('Rota /v1/paciente/create', () => {
    it('Deve criar o paciente com sucesso', async () => {
        cpfPaciente = generateRandomCode()
        const dadosPaciente = {
            cpf: cpfPaciente,
            nome: "José Eduardo",
            datanascimento: "24/04/2001",
            senha: "12345"
        }

        const response = await request(app)
            .post(`/v1/paciente/create`)
            .send(dadosPaciente)


        expect(response.status).toBe(201);
    });
});


describe('Rota /v1/paciente/filtros', () => {
    it('Deve buscar o paciente com sucesso', async () => {
        const filtros = {
            nome: "José Eduardo",
            datanascimento: "24/04/2001"
        }

        const response = await request(app)
            .get(`/v1/paciente/filtros`)
            .query(filtros)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
});




describe('Rota /v1/paciente/listAll', () => {
    it('Deve listar os pacientes com sucesso', async () => {
        const response = await request(app)
            .get(`/v1/paciente/filtros`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
});


describe('Rota /v1/paciente/:cpf', () => {
    it('Deve listar os pacientes com sucesso', async () => {
        const response = await request(app)
            .get(`/v1/paciente/${cpfPaciente}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
});





//TESTES DE RECEITAS
describe('Rota /v1/receita/create', () => {
    it('Deve criar a receita com sucesso', async () => {
        const dados = {
            cpfPaciente: cpfPaciente,
            crmMedico: "CRM/SP"+crmPTeste,
            codigosMedicamentos: [
                codigoMedicamento
            ],
            dataPrescricao: "09/09/2023"
        }


        const response = await request(app)
            .post(`/v1/receita/create`)
            .send(dados)
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(201);
    });
});


describe('Rota /v1/receita/historicoPcpf/historico?cpf=', () => {
    it('Deve listar os pacientes com sucesso', async () => {
        const response = await request(app)
            .get(`/v1/receita/historicoPcpf/historico?cpf=${cpfPaciente}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
});



describe('Rota /v1/receita/medicamentosPreceita/medicamentosReceita?id=', () => {
    it('Deve buscar os medicamentos da receita com sucesso', async () => {

        
        const id = 1

        const response = await request(app)
            .get(`/v1/receita/medicamentosPreceita/medicamentosReceita?id=${id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
});
