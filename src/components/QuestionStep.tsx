import React from "react";
import styled from "styled-components";
import { NextButton, BackButton, OptionButton } from "./Button";
import FloatingLabelInput from "./FloatingLabelInput";
import useWindowWidth from '../hooks/useWindowWidth.tsx';
interface QuestionStepProps {
  question: string;
  options: string[];
  currentStep: number;
  totalSteps: number;
  onNext: (data: string | string[]) => void;
  onBack: () => void;
  paragraph?: string; // Optional paragraph before the question
  name?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  width: 100vw;
  position: relative;
  @media (min-width: 768px) {
    flex-direction: row;
    height: 100vh;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  order: 1;
  position: relative;
  z-index: 1;
  @media (min-width: 768px) {
    width: 45%;
    height: 100%;
    justify-content: flex-end;
    order: 2;
  }
`;

interface StyledImageProps {
  src: string;
  $mobileSrc?: string;
}

const StyledImage = styled.img<StyledImageProps>`
  width: auto;
  height: 100%;
  object-fit: cover;

  @media (max-width: 767px) {
    content: url(${(props) => props.$mobileSrc || props.src});

    object-fit: cover;
    width: 100%;
    height: auto;
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin: 1rem 2rem;
  width: 100%;
  order: 2;
  position: relative;
  z-index: 2;
  @media (min-width: 768px) {
    width: 55%;
    order: 1;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const Paragraph = styled.p`
  color: #555;
  font-size: 1.3rem;
`;

const FinalParagraph = styled(Paragraph)`
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const QuestionText = styled.p`
  color: #333;
  font-size: 1.3rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 360px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

// const OptionText = styled.span`
//   flex: 1;
//   text-align: left;
// `;

const OptionCircle = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #00ccbc;
  color: white;
  margin-right: 8px;
`;

const StyledNextButton = styled(NextButton)`
  width: 100%;
  max-width: 200px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FormRow = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: space-between;
  }

  @media (min-width: 769px) {
    justify-content: flex-start;
  }
`;
// const BackButtonContainer = styled.div`
//   width: 20%;
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   margin-top: auto;

//   @media (max-width: 768px) {
//     width: 100%;
//     justify-content: flex-start;
//     margin-bottom: 20px;
//   }
// `;

const FormContent = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const FormContentContainer = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const LogoImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 10px;

  @media (min-width: 769px) {
    position: static;

    margin: 3rem auto 3rem auto;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 5rem;
    left: 6rem;
    transform: translateX(-50%);
    z-index: 1;
  }
`;
const StepIndicator = styled.div`
  position: absolute;
  top: 6rem;
  right: 4rem;
  font-size: 2rem;
  color: #000;
  text-align: right;
  z-index: 20;

  & > span {
    font-size: 0.9rem;
    color: #333;
  }

  @media (max-width: 768px) {
    top: 2rem;
    right: 1rem;
    font-size: 1rem;
  }
`;

const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  options,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  paragraph,
  name,
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const width = useWindowWidth();
  const handleOptionSelect = (option: string) => {
    setSelectedOptions((prevSelected) => {
      if (currentStep === 3) {
        if (prevSelected.includes(option)) {
          return prevSelected.filter((opt) => opt !== option);
        } else {
          return [...prevSelected, option];
        }
      } else {
        return [option];
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleNextClick = () => {
    if (currentStep === 1) {
      onNext(inputValue);
    } else {
      onNext(selectedOptions);
    }
  };

  return (
    <Container>
      <ImageContainer>
        <StepIndicator>
          {String(currentStep).padStart(2, "0")}{" "}
          <span>| {String(totalSteps).padStart(2, "0")}</span>
        </StepIndicator>
        <StyledImage
          src={
            currentStep === totalSteps
              ? "https://i.ibb.co/cYq3tL2/Group-178.png"
              : "https://i.ibb.co/VWmMfrn/Dise-o-sin-t-tulo.png"
          }
          $mobileSrc={
            currentStep === totalSteps
              ? "https://i.ibb.co/PwrRjKK/Group-175.png"
              : "https://i.ibb.co/PwrRjKK/Group-175.png"
          }
          alt="Placeholder"
        />
       {width < 768 && <LogoImage src="https://i.ibb.co/4p7TMkT/Group.png" alt="Logo" />}
      </ImageContainer>
      <QuestionContainer>
        <FormContentContainer>
          <FormRow>
            <ContentContainer>
              <FormContent>
              {width >= 768 && <LogoImage src="https://i.ibb.co/4p7TMkT/Group.png" alt="Logo" />}

                {paragraph && currentStep === totalSteps ? (
                  <FinalParagraph
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ) : currentStep === 2 && name ? (
                  <Paragraph>
                    Genial {name},{" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: paragraph || "" }}
                    />
                  </Paragraph>
                ) : (
                  paragraph && (
                    <Paragraph
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  )
                )}

                <QuestionText dangerouslySetInnerHTML={{ __html: question }} />

                {currentStep === 1 && (
                  <FloatingLabelInput
                    label="Nombre"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                )}

                {options.length > 0 && (
                  <OptionsContainer>
                    {options.map((option, index) => (
                      <OptionButton
                        key={index}
                        $selected={selectedOptions.includes(option)}
                        onClick={() => handleOptionSelect(option)}
                        $maxWidth={currentStep === 3 ? "45%" : "30%"}
                        $maxWidthMobile={currentStep === 3 ? "100%" : "48.3%"}
                        $hasCircle={currentStep === 3} // Establecer si tiene círculo
                      >
                        {currentStep === 3 ? (
                          <OptionContent>
                            <OptionCircle>
                              {String.fromCharCode(65 + index)}
                            </OptionCircle>
                            <>{option}</>
                          </OptionContent>
                        ) : (
                          <>{option}</>
                        )}
                      </OptionButton>
                    ))}
                  </OptionsContainer>
                )}
              </FormContent>
              <ButtonsContainer>
                {currentStep > 1 && currentStep < totalSteps && (
                  <BackButton onClick={onBack} />
                )}
                <StyledNextButton
                  onClick={handleNextClick}
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                >
                  {currentStep === totalSteps
                    ? "Finalizar"
                    : currentStep === 1
                    ? "Comenzar"
                    : "Siguiente"}
                </StyledNextButton>
              </ButtonsContainer>
            </ContentContainer>
          </FormRow>
        </FormContentContainer>
      </QuestionContainer>
    </Container>
  );
};

export default QuestionStep;
