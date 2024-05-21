// server/formController.js
import { submitForm } from './Service.js';

export async function handleFormSubmission(req, res) {
  const data = req.body;
  try {
    const result = await submitForm(data);
    res.status(200).send(result.message);
  } catch (error) {
    console.error(error);
    // Certifique-se de enviar uma resposta mesmo quando ocorrer um erro
    const errorMessage = error.message || 'Erro interno do servidor';
    res.status(500).send(errorMessage);
  }
}