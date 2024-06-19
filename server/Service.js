// server/Service.js
import { insertFormData } from './formModel.js';
import { selectFormData } from './formModel.js';
import nodemailer from 'nodemailer';


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

let transporter = nodemailer.createTransport({
  
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
  }
});



export async function sendEmail(details) {
  let mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'l.cunha14.lc@gmail.com',
      subject: 'Novo cliente',
      text: `Nome: ${details.name}\nEmail: ${details.email}\nMensagem: ${details.message}`
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      } else {
          console.log('Email enviado: ' + info.response);
      }
  });
}