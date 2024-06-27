Feature: Validação do formato do campo "Telefone" após submissão

  Scenario: Telefone inválido
    Given o usuário preencheu os campos do formulário
    When o usuário submete o formulário com o campo "Telefone" em formato inválido
    Then o sistema deve exibir uma mensagem de erro indicando que o formato do telefone é inválido

  Scenario: Telefone válido
    Given o usuário preencheu os campos do formulário
    When o usuário submete o formulário com o campo "Telefone" em formato válido
    Then nenhuma mensagem de erro deve ser exibida