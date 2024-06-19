Feature: Envio de e-mail de notificação ao vendedor

  Scenario: Enviar e-mail de notificação ao vendedor
    Given o usuário preencheu os campos do formulário corretamente
    When o usuário submete o formulário
    Then um e-mail de notificação deve ser enviado ao vendedor

  Scenario: Tratamento de erros ao enviar e-mail
    Given o usuário preencheu os campos do formulário corretamente
    When ocorre um erro no envio do e-mail
    Then o erro deve ser tratado corretamente