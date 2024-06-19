// server/formController.js
import { submitForm } from './Service.js';
import { getFormData } from './Service.js';
import { sendEmail } from './Service.js';

export async function handleFormSubmission(req, res) {
  const data = req.body;

  try {
    const result = await submitForm(data);
    await sendEmail(data); // Pass the client data to the sendEmail function

    res.status(200).send(result.message);
  } catch (error) {
    console.error(error);
    // Certifique-se de enviar uma resposta mesmo quando ocorrer um erro
    const errorMessage = error.message || 'Erro interno do servidor';
    res.status(500).send(errorMessage);
  }
}

export async function handleFormRequest(req, res) {
  const clientDetails = req.body;
  try {
    const data = await getFormData();
    await sendEmail(clientDetails);
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Erro interno do servidor';
    res.status(500).send(errorMessage);
  }
}