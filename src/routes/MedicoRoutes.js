const express = require('express');
const router = express.Router();
const MedicoController = require('../controllers/MedicoController');

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Rotas relacionadas a médicos
 */

/**
 * @swagger
 * /v1/medicos/token/{token}:
 *   get:
 *     summary: Obtém informações do médico pelo Token.
 *     description: Retorna as informações do médico com base no token de autenticação.
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: [Bearer token]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token de autenticação do médico.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso, retornou as informações do médico.
 *       401:
 *         description: Erro, token não informado.
 *       400:
 *         description: Erro, bad request.
 */
router.get('/token/:token', MedicoController.getMedicoByToken);

/**
 * @swagger
 * /v1/medicos/create:
 *   post:
 *     summary: Cria um médico.
 *     description: Cadastra um médico e retorna o seu JWT.
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crm:
 *                 type: string
 *               nome:
 *                 type: string
 *               datanascimento:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sucesso, criou um novo médico e retornou o JWT.
 *       422:
 *         description: Erro, médico já existe.
 *       400:
 *         description: Erro, bad request.
 */
router.post('/create', MedicoController.create);

/**
 * @swagger
 * /v1/medicos/login:
 *   post:
 *     summary: Realiza o login do médico.
 *     description: Login do médico e retorna o seu JWT.
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crm:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sucesso, realizou o login e retornou o JWT.
 *       400:
 *         description: erro, não foi possível realizar o login.
 *       401:
 *         description: erro, senha incorreta.
 */
router.post('/login', MedicoController.login);

/**
 * @swagger
 * /v1/medicos/listAll:
 *   get:
 *     summary: Listar médicos.
 *     description: Lista todos os médicos.
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: [Bearer token]
 *     responses:
 *       200:
 *         description: Sucesso, listou todos os médicos.
 *       400:
 *         description: Erro, bad request.
 */
router.get('/listAll', MedicoController.findAll);

/**
 * @swagger
 * /v1/medicos/{crm}:
 *   get:
 *     summary: Busca médico por CRM.
 *     description: Busca médico por CRM.
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: crm
 *         required: true
 *         description: CRM do médico a ser buscado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso, listou o médico corretamente.
 *       404:
 *         description: Médico não encontrado.
 *       400:
 *         description: Bad request.
 */
router.get('/:crm', MedicoController.findByCRM);

/**
 * @swagger
 * /v1/medicos/{crm}:
 *   delete:
 *     summary: Deleta médico por CRM.
 *     description: Deleta médico por CRM.
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: [Bearer token]
 *     parameters:
 *       - in: path
 *         name: crm
 *         required: true
 *         description: CRM do médico a ser deletado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso, excluiu o médico corretamente.
 *       404:
 *         description: Médico não encontrado.
 *       400:
 *         description: Bad request.
 */
router.delete('/:crm', MedicoController.delete);


module.exports = router;