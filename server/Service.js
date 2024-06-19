import { insertFormData } from "./formModel.js";
import { selectFormData } from "./formModel.js";
import nodemailer from "nodemailer";
import SMTP_CONFIG from "./smtp.js";

export async function submitForm(data) {
  try {
    await insertFormData(data);
    return { message: "Dados inseridos com sucesso" };
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

export async function enviarEmail(details) {
  try {
    console.log(transporter); // Log transporter for debugging
    const mailSent = await transporter.sendMail({
      text: `Nome: ${details.nome}\nEmail: ${details.email}\nTelefone: ${details.telefone}\nEmpresa: ${details.empresa}\nDescrição: ${details.descricao}`,
      subject: "Novo formulário submetido",
      from: process.env.EMAIL_USER,
      to: "l.cunha14.lc@gmail.com",
    });
    console.log(mailSent);
    return "Email sent";
  } catch (error) {
    console.error(error);
    throw new Error("Error sending email");
  }
}