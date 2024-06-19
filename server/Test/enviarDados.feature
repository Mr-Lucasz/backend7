Feature: Verificação de armazenamento dos dados no servidor

  Scenario: Garantir que os dados do formulário são armazenados corretamente no servidor
    Given o usuário preencheu os campos do formulário corretamente
    When o usuário submete o formulário
    Then os dados devem ser enviados e armazenados no servidor

  Scenario: Tratamento de erros ao armazenar dados
    Given o usuário preencheu os campos do formulário corretamente
    When ocorre um erro ao armazenar os dados no servidor
    Then o erro deve ser tratado corretamente