// src/emailTemplates/EmailTemplate.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface EmailTemplateProps {
  name: string;
  message: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ name }) => (
  <html>
    <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <tr>
          <td>
            <Header />
          </td>
        </tr>
        <tr>
          <td>
            <div style={{ padding: '20px', margin: '20px 0' }}>
              <p><b>Hola, {name}!</b></p>
              <p style={{ color: '#555' }}>
                En Customer Scoops nos importa mucho tu experiencia, y queremos asegurarnos de que nuestros servicios sigan cumpliendo tus expectativas. Por eso, hemos preparado unas breves preguntas para que puedas compartir tus comentarios y sugerencias.
              </p>
              <p style={{ color: '#555', marginTop: '20px' }}>
                Tu opinión es clave para ayudarnos a mejorar y adaptarnos a lo que realmente necesitas. Nos tomará solo unos minutos de tu tiempo.
              </p>
              <div style={{ textAlign: 'left', marginTop: '20px' }}>
                <button style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                  
                }}  onClick={() => {
                  window.location.href = "https://multi-step-react-ts-uk2w.vercel.app/";}}>
                  Ingresa Aquí
                </button>
              </div>
              <p style={{ color: '#555', marginTop: '20px' }}>
                Agradecemos de antemano tu participación y confianza en Customer Scoops. ¡Gracias por tu tiempo y por contribuir a nuestra mejora continua!
              </p>
              <p>
                Saludos,<br />
                <span><b>Kerly Cervantes</b></span><br />
                Equipo de Customer Scoops
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <Footer />
          </td>
        </tr>
      </table>
    </body>
  </html>
);

export default EmailTemplate;