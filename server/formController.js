import { insertFormData } from './formModel.js';

export async function submitForm(req, res) {
  const data = req.body;
  try {
    await insertFormData(data);
    res.status(200).send('Data inserted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}