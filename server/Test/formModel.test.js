import { defineFeature, loadFeature } from 'jest-cucumber';
import { insertFormData } from '../formModel';

const feature = loadFeature('./server/Test/validacaoTelefone.feature');

defineFeature(feature, test => {
  test('Telefone inválido', ({ given, when, then }) => {
    let formData;
    let result;

    given('o usuário preencheu os campos do formulário', () => {
      formData = {
        nome: 'João',
        email: 'joao@example.com',
        telefone: '12345',
        empresa: 'Empresa XYZ',
        mensagem: 'Descrição da necessidade',
        checkbox: true
      };
    });

    when('o usuário submete o formulário com o campo "Telefone" em formato inválido', async () => {
      result = await insertFormData(formData);
    });

    then('o sistema deve exibir uma mensagem de erro indicando que o formato do telefone é inválido', () => {
      expect(result).toEqual({ success: false, message: 'Formato do telefone inválido.' });
    });
  });

  test('Telefone válido', ({ given, when, then }) => {
    let formData;
    let result;

    given('o usuário preencheu os campos do formulário', () => {
      formData = {
        nome: 'João',
        email: 'joao@example.com',
        telefone: '123456789',
        empresa: 'Empresa XYZ',
        mensagem: 'Descrição da necessidade',
        checkbox: true
      };
    });

    when('o usuário submete o formulário com o campo "Telefone" em formato válido', async () => {
      result = await insertFormData(formData);
    });

    then('nenhuma mensagem de erro deve ser exibida', () => {
      expect(result).toEqual({ success: true });
    });
  });
});