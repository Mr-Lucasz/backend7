const SMTP_CONFIG = {
    host : 'smtp.gmail.com',
    port : 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
};

export default SMTP_CONFIG;
