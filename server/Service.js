import axios from 'axios';

const apiUrl = "https://www.agile7tech.com.br";

export async function submitForm(data) {
  try {
    const response = await axios.post(`${apiUrl}/form`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}