import { handleFormSubmission } from "../formController.js";
import { submitForm } from "../Service.js";

jest.mock("../Service.js"); // Mocking the Service module

describe('handleFormSubmission', () => {
    test('should store form data correctly', async () => {
      // Mock request and response objects
      const req = {
        body: {
          nome: 'João',
          email: 'joao@example.com',
          telefone: '123456789',
          empresa: 'Empresa XYZ',
          descricao: 'Descrição da necessidade'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
  
      // Mock the submitForm and sendEmail functions
      submitForm.mockResolvedValue({ message: 'Dados inseridos com sucesso' });
  
      await handleFormSubmission(req, res);
  
      expect(submitForm).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Dados inseridos com sucesso');
    });
  
    test('should handle errors correctly', async () => {
      const req = {
        body: {
          nome: 'João',
          email: 'joao@example.com',
          telefone: '123456789',
          empresa: 'Empresa XYZ',
          descricao: 'Descrição da necessidade'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
  
      const errorMessage = 'Erro ao inserir dados';
      submitForm.mockRejectedValue(new Error(errorMessage));
  
      await handleFormSubmission(req, res);
  
      expect(submitForm).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });