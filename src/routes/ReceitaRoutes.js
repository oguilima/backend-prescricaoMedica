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
 *       200:
 *         description: Sucesso, criou uma nova receita.
 *     examples:
 *       application/json:
 *         cpfPaciente: "12345678900"
 *         crmMedico: "CRM12345"
 *         codigosMedicamentos: ["Med1", "Med2", "Med3"]
 *         dataPrescricao: "2023-09-15"
 */
router.post('/create', ReceitaController.createReceita);


router.get('/historicoPcpf/:cpf', ReceitaController.getHistoricoPorCpf);

router.get("/medicamentosPreceita/:id", ReceitaController.getMedicamentosReceitaPid)




module.exports = router;
