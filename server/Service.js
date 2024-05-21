// server/Service.js
import { insertFormData } from './formModel.js';
import { selectFormData } from './formModel.js';

export async function submitForm(data) {
  try {
    await insertFormData(data);
    return { message: 'Dados inseridos com sucesso' };
  } catch (error) {
    console.error(error);
    // É necessário lançar o erro para que o handleFormSubmission possa capturá-lo
    throw error;
  }
}

export async function getFormData() {
  try {
    const data = await selectFormData();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}