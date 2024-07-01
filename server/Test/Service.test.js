import { defineFeature, loadFeature } from 'jest-cucumber';
import { enviarEmail } from '../Service';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

// Ajuste o caminho relativo para o arquivo de feature
const feature = loadFeature('./server/Test/feature/enviarEmail.feature');

defineFeature(feature, test => {
    let sendMailMock;

    beforeEach(() => {
        sendMailMock = jest.fn().mockResolvedValue('Email sent');
      
        nodemailer.createTransport.mockReturnValue({
            sendMail: sendMailMock
        });
    });

    test('Enviar e-mail de notificação ao vendedor', ({ given, when, then }) => {
        let details;
        let result;

        given('o usuário preencheu os campos do formulário corretamente', () => {
            details = {
                nome: 'João',
                email: 'joao@example.com',
                telefone: '123456789',
                empresa: 'Empresa XYZ',
                mensagem: 'Descrição da necessidade'
            };
        });

        when('o usuário submete o formulário', async () => {
            result = await enviarEmail(details);
        });

        then('um e-mail de notificação deve ser enviado ao vendedor', () => {
            expect(nodemailer.createTransport).toHaveBeenCalled();
            expect(sendMailMock).toHaveBeenCalledWith({
                from: 'l.cunha14.lc@gmail.com',
                to: 'l.cunha14.lc@gmail.com',
                subject: 'Novo formulário submetido',
                text: `Nome: ${details.nome}\nEmail: ${details.email}\nTelefone: ${details.telefone}\nEmpresa: ${details.empresa}\nDescrição: ${details.mensagem}`
            });
            expect(result).toBe('Email sent');
        });
    });

    test('Tratamento de erros ao enviar e-mail', ({ given, when, then }) => {
        let details;
        let errorMessage;

        given('o usuário preencheu os campos do formulário corretamente', () => {
            details = {
                nome: 'João',
                email: 'joao@example.com',
                telefone: '123456789',
                empresa: 'Empresa XYZ',
                mensagem: 'Descrição da necessidade'
            };
        });

        when('ocorre um erro no envio do e-mail', async () => {
            errorMessage = 'Erro ao enviar email';
            sendMailMock.mockRejectedValue(new Error(errorMessage));

            try {
                await enviarEmail(details);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }
        });

        then('o erro deve ser tratado corretamente', () => {
            expect(nodemailer.createTransport).toHaveBeenCalled();
            expect(sendMailMock).toHaveBeenCalledWith({
                from: 'l.cunha14.lc@gmail.com',
                to: 'l.cunha14.lc@gmail.com',
                subject: 'Novo formulário submetido',
                text: `Nome: ${details.nome}\nEmail: ${details.email}\nTelefone: ${details.telefone}\nEmpresa: ${details.empresa}\nDescrição: ${details.mensagem}`
            });
        });
    });
});