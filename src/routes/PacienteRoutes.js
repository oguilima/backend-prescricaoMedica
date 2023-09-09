const express = require('express');
const router = express.Router();
const PacienteController = require('../controllers/PacienteController'); 


/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Rotas relacionadas a pacientes
 */





/**
 * @swagger
 * /v1/paciente/filtros:
 *   get:
 *     summary: Filtra pacientes.
 *     description: Cadastra um paciente.
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               datanascimento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sucesso, filtrou os pacientes.
 *       400:
 *         description: Erro, bad request.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Usuário não encontrado.
 */
router.get('/filtros', PacienteController.find);


/**
 * @swagger
 * /v1/paciente/create:
 *   post:
 *     summary: Cria um paciente.
 *     description: Cadastra um paciente.
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               datanascimento:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sucesso, criou um novo paciente.
 *       422:
 *         description: Paciente já cadastrado.
 *       400:
 *         description: Bad request.
 */
router.post('/create', PacienteController.create);



/**
 * @swagger
 * /v1/paciente/listAll:
 *   get:
 *     summary: Listar pacientes.
 *     description: Lista todos os pacientes.
 *     tags: [Pacientes] 
 *     responses:
 *       200:
 *         description: Sucesso, listou todos os pacientes.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Não autorizado.
 */
router.get('/listAll', PacienteController.findAll);



/**
 * @swagger
 * /v1/paciente/{cpf}:
 *   get:
 *     summary: Busca paciente por cpf.
 *     description: Busca paciente por cpf.
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         description: cpf do paciente a ser buscado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso, listou o médico corretamente.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Não encontrado.
 */
router.get('/:cpf', PacienteController.findByCPF);





/**
 * @swagger
 * /v1/paciente/{cpf}:
 *   delete:
 *     summary: Deleta paciente por cpf.
 *     description: Deleta paciente por cpf.
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         description: cpf do paciente a ser deletado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso, excluiu o paciente corretamente.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Não encontrado.
 */
 
router.delete('/:cpf', PacienteController.delete);

module.exports = router;
