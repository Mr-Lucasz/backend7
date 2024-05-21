// server/formModel.js
import { supabase } from './Database.js';

export async function insertFormData(data) {
  try {
    const { error } = await supabase
        .from('cliente')
        .insert([data]);

    if (error) throw error;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to insert data');
  }
}