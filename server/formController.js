// server/formController.js
import { submitForm } from './Service.js';
import { getFormData } from './Service.js';
import { enviarEmail } from './Service.js';

export async function handleFormSubmission(req, res) {
  const data = req.body;

  try {
    const result = await submitForm(data);
    await enviarEmail(data); // Pass the client data to the sendEmail function

    res.status(200).send(result.message);
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Erro interno do servidor';
    res.status(500).send(errorMessage);
  }
}

export async function handleFormRequest(req, res) {
  const clientDetails = req.body;
  try {
    const data = await getFormData();
    await enviarEmail(clientDetails);
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Erro interno do servidor';
    res.status(500).send(errorMessage);
  }
}