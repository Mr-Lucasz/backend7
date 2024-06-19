// Service.test.js
const { sendEmail } = require('../Service');
const nodemailer = require('nodemailer');

jest.mock('nodemailer');

describe('sendEmail', () => {
    test('should send notification email to the seller', async () => {
        const details = {
            nome: 'João',
            email: 'joao@example.com',
            telefone: '123456789',
            empresa: 'Empresa XYZ',
            descricao: 'Descrição da necessidade'
        };

        // Mock the transporter and its sendMail method
        const sendMailMock = jest.fn().mockResolvedValue('Email sent');
        nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

        const result = await sendEmail(details);

        expect(nodemailer.createTransport).toHaveBeenCalled();
        expect(sendMailMock).toHaveBeenCalledWith({
            from: 'your-email@example.com',
            to: 'vendedor@example.com',
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

        // Mock the transporter and its sendMail method to throw an error
        const errorMessage = 'Error sending email';
        const sendMailMock = jest.fn().mockRejectedValue(new Error(errorMessage));
        nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

        try {
            await sendEmail(details);
        } catch (error) {
            expect(error.message).toBe(errorMessage);
        }

        expect(nodemailer.createTransport).toHaveBeenCalled();
        expect(sendMailMock).toHaveBeenCalledWith({
            from: 'your-email@example.com',
            to: 'vendedor@example.com',
            subject: 'Novo formulário submetido',
            text: `Nome: ${details.nome}\nEmail: ${details.email}\nTelefone: ${details.telefone}\nEmpresa: ${details.empresa}\nDescrição: ${details.descricao}`
        });
    });
});