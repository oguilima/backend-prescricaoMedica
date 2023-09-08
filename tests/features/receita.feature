Feature: Criação de Receita

  Scenario: Criar uma receita com sucesso
    Given o CPF do paciente "654321"
    And o CRM do médico "654321"
    And os códigos de medicamentos "4321", "1234"
    And a data de prescrição "2023-09-15"
    When eu faço uma solicitação POST para "/v1/receita/create"
    Then a resposta deve ter status 200
    And a resposta deve conter "Receita criada com sucesso."
