import { supabase } from "./Database.js";

export async function insertFormData(data) {
  const telefoneRegex = /^[0-9]{9,11}$/;

  if (!telefoneRegex.test(data.telefone)) {
    console.error("Formato do telefone inválido:", data.telefone);
    return { success: false, message: "Formato do telefone inválido." };
  }

  try {
    console.log("Tentando inserir dados no banco:", data);
    const { error } = await supabase.from("cliente").insert([data]);

    if (error) {
      console.error("Erro ao inserir dados no banco:", error);
      throw error;
    }

    console.log("Dados inseridos com sucesso no banco");
    return { success: true };
  } catch (error) {
    console.error("Erro ao inserir dados:", error); // Imprime os detalhes do erro
    throw new Error("Falha ao inserir dados");
  }
}

export async function selectFormData() {
  try {
    const { data, error } = await supabase.from("cliente").select("*");

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error details:", error); // Imprime os detalhes do erro
    throw new Error("Falha ao buscar dados");
  }
}
