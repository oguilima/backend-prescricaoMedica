const express = require('express');
const conn = require('./src/db/conn');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

const cors = require('cors')

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'APIS Prescrição Médica',
      version: '1.0.0',
      description: 'Documentação das APIS do projeto de prescrição médica - NUSA ',
    },
  },
  apis: ['./src/routes/MedicoRoutes.js', './src/routes/MedicamentoRoutes.js', 
  './src/routes/PacienteRoutes.js', './src/routes/ReceitaRoutes.js'], 
};

const specs = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }))



const MedicoRoutes = require('./src/routes/MedicoRoutes');
const MedicamentoRoutes = require('./src/routes/MedicamentoRoutes');
const PacienteRoutes = require('./src/routes/PacienteRoutes');
const ReceitaRoutes = require('./src/routes/ReceitaRoutes');

app.use('/v1/medicos', MedicoRoutes);
app.use('/v1/medicamento', MedicamentoRoutes);
app.use('/v1/paciente', PacienteRoutes);
app.use('/v1/receita', ReceitaRoutes);

conn
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor está ouvindo na porta 3000.');
    });
  })
  .catch((err) => {
    console.log('Erro ao sincronizar o banco de dados:', err);
  });
