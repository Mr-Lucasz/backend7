// server/Service.js
import { insertFormData } from './formModel.js';

export async function submitForm(data) {
  try {
    await insertFormData(data);
    return { message: 'Data inserted successfully' };
  } catch (error) {
    console.error(error);
  }
}