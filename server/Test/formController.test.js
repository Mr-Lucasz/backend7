import { defineFeature, loadFeature } from 'jest-cucumber';
import { handleFormSubmission } from '../formController';
import { submitForm } from '../Service';

jest.mock('../Service'); // Mocking the Service module

const feature = loadFeature('./server/Test/enviarDados.feature');

defineFeature(feature, test => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  test('Garantir que os dados do formulário são armazenados corretamente no servidor', ({ given, when, then }) => {
    let req;
    let res;

    given('o usuário preencheu os campos do formulário corretamente', () => {
      req = {
        body: {
          nome: 'João',
          email: 'joao@example.com',
          telefone: '123456789',
          empresa: 'Empresa XYZ',
          descricao: 'Descrição da necessidade'
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
    });

    when('o usuário submete o formulário', async () => {
      submitForm.mockResolvedValue({ message: 'Dados inseridos com sucesso' });
      await handleFormSubmission(req, res);
    });

    then('os dados devem ser enviados e armazenados no servidor', () => {
      expect(submitForm).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Dados inseridos com sucesso');
    });
  });

  test('Tratamento de erros ao armazenar dados', ({ given, when, then }) => {
    let req;
    let res;
    const errorMessage = 'Erro ao inserir dados';

    given('o usuário preencheu os campos do formulário corretamente', () => {
      req = {
        body: {
          nome: 'João',
          email: 'joao@example.com',
          telefone: '123456789',
          empresa: 'Empresa XYZ',
          descricao: 'Descrição da necessidade'
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
    });

    when('ocorre um erro ao armazenar os dados no servidor', async () => {
      submitForm.mockRejectedValue(new Error(errorMessage));
      await handleFormSubmission(req, res);
    });

    then('o erro deve ser tratado corretamente', () => {
      expect(submitForm).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });
});