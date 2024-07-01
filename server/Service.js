import { insertFormData, selectFormData } from "./formModel.js";
import nodemailer from "nodemailer";
import SMTP_CONFIG from "./smtp.js";

export async function submitForm(data) {
  try {
    console.log("Dados antes de inserir no banco de dados:", data);
    const result = await insertFormData(data);
    console.log("Resultado da inserção no banco de dados:", result);

    if (!result.success) {
      throw new Error(result.message);
    }

    return { message: "Formulário enviado com sucesso." };
  } catch (error) {
    console.error(error);
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

export async function enviarEmail(details) {
  const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    console.log("Dados antes de enviar por e-mail:", details);
    const mailSent = await transporter.sendMail({
      text: `Nome: ${details.nome}\nEmail: ${details.email}\nTelefone: ${details.telefone}\nEmpresa: ${details.empresa}\nDescrição: ${details.mensagem}`,
      subject: "Novo formulário submetido",
      from: process.env.EMAIL_USER,
      to: "l.cunha14.lc@gmail.com",
    });
    return "Email sent";
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Erro ao enviar email");
  }
}
