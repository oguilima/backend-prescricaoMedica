const express = require('express');
const router = express.Router();
const ReceitaController = require('../controllers/ReceitaController'); 

/**
 * @swagger
 * tags:
 *   name: Receitas
 *   description: Rotas relacionadas a receitas.
 */



/**
 * @swagger
 * /v1/receita/create:
 *   post:
 *     summary: Cria uma receita ao paciente.
 *     description: Cadastra uma receita para um paciente.
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: [Bearer token ]  # Aqui você especifica o esquema de autenticação Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpfPaciente:
 *                 type: string
 *               crmMedico:
 *                 type: string
 *               codigosMedicamentos:
 *                 type: array
 *                 items:
 *                   type: string
 *               dataPrescricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sucesso, criou uma nova receita.
 *       404:
 *         description: Recurso não encontrado.
 *       500:
 *         description: Erro ao processar.
 *     examples:
 *       application/json:
 *         cpfPaciente: "12345678900"
 *         crmMedico: "CRM12345"
 *         codigosMedicamentos: ["Med1", "Med2", "Med3"]
 *         dataPrescricao: "2023-09-15"
 */
router.post('/create', ReceitaController.createReceita);

/**
 * @swagger
 * /v1/receita/historicoPcpf/{cpf}:
 *   get:
 *     summary: Obtém o histórico de receitas de um paciente por CPF.
 *     description: Retorna o histórico de receitas de um paciente com base no seu CPF.
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: [Bearer token]
 *     parameters:
 *       - name: cpf
 *         in: path
 *         description: CPF do paciente.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso, retornou o histórico de receitas.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Não encontrado.
 */
router.get('/historicoPcpf/:cpf', ReceitaController.getHistoricoPorCpf);

/**
 * @swagger
 * /v1/receita/medicamentosPreceita/{id}:
 *   get:
 *     summary: Obtém os medicamentos de uma receita por ID.
 *     description: Retorna os medicamentos prescritos em uma receita com base no seu ID.
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: [Bearer token]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da receita.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso, retornou o histórico de receitas.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Não encontrado.
 *       500:
 *         description: Erro ao processar.
 */
router.get("/medicamentosPreceita/:id", ReceitaController.getMedicamentosReceitaPid);



module.exports = router;
