module.exports = {
    // Caminho para os diretórios de recursos e etapas
    require: [
      __dirname + '/tests/features/*.js', // Caminho absoluto para suas definições de etapas
    ],
  
    // Formato de relatório de saída
    format: ['pretty'],
  
    // Caminho para os arquivos de recursos
    'no-source': true,
    'no-strict-gherkin': true,
  };
  