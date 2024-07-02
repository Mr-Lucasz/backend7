import { submitForm, getFormData, enviarEmail } from "./Service.js";
export async function handleFormSubmission(req, res) {
  const data = req.body;

  try {
    // Verifique os dados recebidos
    console.log("Dados recebidos do formulário:", data);
    // Primeiro, insere os dados no banco de dados
    const result = await submitForm(data);
    console.log("Resultado após submitForm:", result);
    // Certifique-se de que os mesmos dados sejam enviados por e-mail
    await enviarEmail(data);
    res.status(200).json({
      message: "Success",
      emailStatus: "Email sent successfully"
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || "Erro interno do servidor";
    res.status(500).json({ message: errorMessage });
  }
}

export async function handleFormRequest(req, res) {
  const clientDetails = req.body;
  try {
    // Verifique os dados recebidos
    console.log("Detalhes do cliente recebidos:", clientDetails);

    const data = await getFormData();
    await enviarEmail(clientDetails);
    res.status(200).send(data);
  } catch (error) {
    console.error("Erro no handleFormRequest:", error);
    const errorMessage = error.message || "Erro interno do servidor";
    res.status(500).send({ message: errorMessage });
  }
}