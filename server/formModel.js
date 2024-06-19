// server/formModel.js
import { supabase } from './Database.js';


export async function insertFormData(data) {
  const telefoneRegex = /^[0-9]{9}$/;

  if (!telefoneRegex.test(data.telefone)) {
    return { success: false, message: 'Formato do telefone inválido.' };
  }

  try {
    const { error } = await supabase
        .from('cliente')
        .insert([data]);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error details:', error); // Print out the error details
    throw new Error('Falha ao inserir dados');
  }
}

export async function selectFormData() {
  try {
    const { data, error } = await supabase
        .from('cliente')
        .select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error details:', error); // Print out the error details
    throw new Error('Falha ao buscar dados');
  }
}