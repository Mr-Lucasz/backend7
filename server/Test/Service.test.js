// Service.test.js
import { enviarEmail } from '../Service';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('enviarEmail', () => {
    let sendMailMock;

    beforeEach(() => {
        sendMailMock = jest.fn().mockResolvedValue('Email sent');
      
        nodemailer.createTransport.mockReturnValue({
          sendMail: sendMailMock
        });
      });

    test('should send notification email to the seller', async () => {
        const details = {
            nome: 'João',
            email: 'joao@example.com',
            telefone: '123456789',
            empresa: 'Empresa XYZ',
            descricao: 'Descrição da necessidade'
        };

        const result = await enviarEmail(details);

        expect(nodemailer.createTransport).toHaveBeenCalled();
        expect(sendMailMock).toHaveBeenCalledWith({
            from: 'l.cunha14.lc@gmail.com',
            to: 'l.cunha14.lc@gmail.com',
            subject: 'Novo formulário submetido',
            text: `Nome: ${details.nome}\nEmail: ${details.email}\nTelefone: ${details.telefone}\nEmpresa: ${details.empresa}\nDescrição: ${details.descricao}`
        });
        expect(result).toBe('Email sent');
    });

    test('should handle errors when sending email', async () => {
        const details = {
            nome: 'João',
            email: 'joao@example.com',
            telefone: '123456789',
            empresa: 'Empresa XYZ',
            descricao: 'Descrição da necessidade'
        };

        const errorMessage = 'Error sending email';
        sendMailMock.mockRejectedValue(new Error(errorMessage));

        try {
            await enviarEmail(details);
        } catch (error) {
            expect(error.message).toBe(errorMessage);
        }

        expect(nodemailer.createTransport).toHaveBeenCalled();
        expect(sendMailMock).toHaveBeenCalledWith({
            from: 'l.cunha14.lc@gmail.com',
            to: 'l.cunha14.lc@gmail.com',
            subject: 'Novo formulário submetido',
            text: `Nome: ${details.nome}\nEmail: ${details.email}\nTelefone: ${details.telefone}\nEmpresa: ${details.empresa}\nDescrição: ${details.descricao}`
        });
    });
});