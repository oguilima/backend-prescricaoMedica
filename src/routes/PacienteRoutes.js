const express = require('express');
const router = express.Router();
const PacienteController = require('../controllers/PacienteController'); 


/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Rotas relacionadas a pacientes
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
 *       200:
 *         description: Sucesso, criou um novo paciente.
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
 */
router.delete('/:cpf', PacienteController.delete);

module.exports = router;
