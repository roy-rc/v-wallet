const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"v-wallet" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

const sendPaymentToken = async (email, token, amount) => {
  const subject = 'Token de confirmación de pago';
  const text = `Tu token de confirmación es: ${token}. Válido por 5 minutos para el pago de $${amount}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Confirmación de Pago</h2>
      <p>Has iniciado un pago por <strong>$${amount}</strong></p>
      <div style="background: #f0f0f0; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
        <h1 style="color: #007bff; font-size: 32px; margin: 0;">${token}</h1>
        <p style="color: #666; margin: 10px 0;">Token de confirmación</p>
      </div>
      <p style="color: #666;">Este token es válido por <strong>5 minutos</strong></p>
      <p style="color: #666;">Si no realizaste esta transacción, ignora este mensaje.</p>
    </div>
  `;
  
  return await sendEmail(email, subject, text, html);
};

module.exports = {
  sendEmail,
  sendPaymentToken
};