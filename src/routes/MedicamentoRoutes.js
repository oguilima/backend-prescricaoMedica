const express = require('express');
const router = express.Router();
const Medicamento = require('../controllers/MedicamentoController'); 


/**
 * @swagger
 * tags:
 *   name: Medicamentos
 *   description: Rotas relacionadas a medicamentos
 */


/**
 * @swagger
 * /v1/medicamento/create:
 *   post:
 *     summary: Cria um medicamento.
 *     description: Cadastra um medicamento. Requer um token de autorização no formato Bearer Token.
 *     tags: [Medicamentos]
 *     security:
 *       - BearerAuth: []   # Isso especifica que a rota requer autenticação com Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               nome:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sucesso, criou um novo medicamento.
 */
router.post('/create', Medicamento.create);



/**
 * @swagger
 * /v1/medicamento/findAll:
 *   get:
 *     summary: Listar medicamentos.
 *     description: Lista todos os medicamentos.
 *     tags: [Medicamentos] 
 *     responses:
 *       200:
 *         description: Sucesso, listou todos os medicamentos.
 */
router.get('/findAll', Medicamento.findAll);

module.exports = router;
