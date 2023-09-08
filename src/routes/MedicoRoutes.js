const express = require('express');
const router = express.Router();
const MedicoController = require('../controllers/MedicoController');

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Rotas relacionadas a médicos
 */


router.get('/token/:token', MedicoController.getMedicoByToken);

/**
 * @swagger
 * /v1/medicos/create:
 *   post:
 *     summary: Cria um médico.
 *     description: Cadastra um médico e retorna o seu jwt.
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
 *       200:
 *         description: Sucesso, criou um novo médico.
 */
router.post('/create', MedicoController.create);


/**
 * @swagger
 * /v1/medicos/login:
 *   post:
 *     summary: Realiza o login do médico.
 *     description: Login do médico e retorna o seu jwt.
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
 *         description: Sucesso, realizou o login.
 */
router.post('/login', MedicoController.login);


/**
 * @swagger
 * /v1/medicos/listAll:
 *   get:
 *     summary: Listar médicos.
 *     description: Lista todos os médicos.
 *     tags: [Médicos] 
 *     responses:
 *       200:
 *         description: Sucesso, listou todos os médicos.
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
 */
router.get('/:crm', MedicoController.findByCRM);





/**
 * @swagger
 * /v1/medicos/{crm}:
 *   delete:
 *     summary: Deleta médico por CRM.
 *     description: Deleta médico por CRM.
 *     tags: [Médicos]
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
 */
router.delete('/:crm', MedicoController.delete);

module.exports = router;