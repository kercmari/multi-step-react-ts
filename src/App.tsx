// src/App.tsx
import React, { useState } from 'react';
import QuestionStep from './components/QuestionStep';
import ProgressBar from './components/ProgressBar';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import EmailTemplate from './emailTemplates/EmailTemplate';

interface Question {
  question: string;
  options: string[];
  paragraph?: string;
}

const AppContainer = styled.div<{ $isLastStep: boolean }>`
  background: ${(props) => (props.$isLastStep ? '#00CCBC' : '#FFFFFF')};
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;  
  box-sizing: border-box;
  position: relative;
  @media (max-width: 768px) {
    background: ${(props) => (props.$isLastStep ? '#FFFFFF' : '#FFFFFF')};
   
  }
`;

const questions: Question[] = [
  {
    paragraph:
      'Muchas gracias por tu interés en conocer <b>customerScoops</b>, que a través de Formularios Conversacionales Inteligentes te ayudamos a aumentar el revenue y rentabilidad de tu negocio.',
    question: 'Queremos conocerte, ¿cuál es tu nombre?',
    options: [],
  },
  {
    question: '¿Cuál es tu cargo/posición dentro de tu empresa?',
    paragraph:
      'Ahora nos gustaría tener cierta info para diseñar una gran propuesta de valor para ti:',
    options: [
      'Board member',
      'C-level',
      'Gerente',
      'Subgerente',
      'Jefe área',
      'Líder de área',
      'Ejecutivo / Analista',
      'Otro',
    ],
  },
  {
    question: '¿Cuáles son tus principales desafíos para 2024?',
    options: [
      'Aumentar conversión de leads a clientes',
      'Reducir customer churn',
      'Implementar un programa VoC',
      'Reducir costos en gestión de reclamos',
      'Optimizar procesos comerciales',
      'Optimizar procesos operativos',
      'Otro',
    ],
  },
  {
    question: '¿Cuál CRM están utilizando en tu empresa?',
    options: [
      'SAP',
      'Microsoft Dynamics',
      'Salesforce',
      'Hubspot',
      'Zoho',
      'Netsuite (Oracle)',
      'Monday',
      'CRM Propio',
      'No tengo CRM',
    ],
  },
  {
    paragraph: '<b>Ahora te vamos a sorprender...</b>',
    question: '¿A cuál industria pertenece tu empresa?',
    options: [
      'Tecnología',
      'Software',
      'Servicios',
      'Financiera',
      'Telecomunicaciones',
      'Producción / Fabricación',
      'Logística',
      'Consumo Masivo',
      'Mayorista',
      'Retail',
      'Otra',
    ],
  },
  {
    paragraph:
      '<b>Muchas Gracias</b><br>por querer ser parte<br>de la familia Scoopers.',
    question: '<i>¡Nos vemos pronto!</i>',
    options: [],
  },
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<{ [key: number]: string | string[] }>(
    {}
  );
  const name = formData[1] as string;
  const totalSteps = questions.length;

  const handleNext = (selectedData: string | string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      [currentStep]: selectedData,
    }));

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      sendFormData({ ...formData, [currentStep]: selectedData });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const sendFormData = (data: { [key: number]: string | string[] }) => {
    const htmlContent = ReactDOMServer.renderToStaticMarkup(
      <EmailTemplate
        name={data[1] as string}
        message="Gracias por completar el formulario."
      />
    );

    const recipientEmail = 'example@example.com';

    fetch('https://node-send-email-ssr-production.up.railway.app/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: recipientEmail, htmlContent }),
    })
      .then((response) => response.json())
      .then((result) => console.log('Form data sent:', result))
      .catch((error) => console.error('Error sending form data:', error));
  };

  return (
    <AppContainer $isLastStep={currentStep === totalSteps}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <QuestionStep
        question={questions[currentStep - 1].question}
        options={questions[currentStep - 1].options}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onBack={handleBack}
        paragraph={questions[currentStep - 1].paragraph}
        name={name}
      />
    </AppContainer>
  );
};

export default App;