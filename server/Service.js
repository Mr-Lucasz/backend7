// server/Service.js
import { insertFormData } from './formModel.js';
import { selectFormData } from './formModel.js';
import nodemailer from 'nodemailer';
import SMTP_CONFIG from './smtp.js';


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

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass
  },
  tls: { rejectUnauthorized: false }

});



export async function enivarEmail(details) {

  const mailSent = transporter.sendMail({
    text : `Nome: ${details.name}\nEmail: ${details.email}\nMensagem: ${details.message}`,
    subject: 'Novo cliente',
    from: process.env.EMAIL_USER,
    to: 'l.cunha14.lc@gmail.com',
  });
 console.log(mailSent);

}