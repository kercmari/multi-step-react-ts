// Button.tsx
import styled, { css } from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'next' | 'back';
  $selected?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: transparent;
  color: #333;
  border: 2px solid #333;
  border-radius: 35px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  width: auto;
  min-height: 50px;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  ${(props) =>
    props.$selected &&
    css`
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
      border: none;
    `}

  ${(props) =>
    props.$variant === 'next' &&
    css`
      background-color: #333;
      color: white;
      border: none;
      &:hover {
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
      }
      &:active {
        transform: scale(0.98);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
      }
    `}

  ${(props) =>
    props.$variant === 'back' &&
    css`
      background-color: transparent;
      color: #333;
      border: 2px solid #333;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      }
      &:active {
        transform: scale(0.98);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
      }
    `}
`;

interface OptionButtonProps extends ButtonProps {
  $maxWidth?: string;
  $maxWidthMobile?: string;
  $hasCircle?: boolean; // Nueva prop para diferenciar tipos de botones
}

export const OptionButton = styled(Button)<OptionButtonProps>`
  padding: ${(props) => (props.$hasCircle ? '5px' : '15px')};
  min-width: ${(props) => (props.$hasCircle ? '100px' : '150px')};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$hasCircle ? 'flex-start' : 'center')};
  max-width: ${(props) => props.$maxWidth || '50%'};
  flex: 1 1 ${(props) => props.$maxWidth || '50%'};

  @media (max-width: 768px) {
    max-width: ${(props) => props.$maxWidthMobile || '100%'};
    flex: 1 1 ${(props) => props.$maxWidthMobile || '100%'};
  }
`;

// Componentes NextButton y BackButton
export const NextButton: React.FC<
  Omit<ButtonProps, 'ref'> & { currentStep?: number; totalSteps?: number }
> = ({ children, currentStep, totalSteps, ...props }) => (
  <Button $variant="next" {...props}>
    {children}
    {currentStep && totalSteps && currentStep < totalSteps && currentStep > 1 ? (
      <FaArrowRight color="#00FF00" />
    ) : null}
  </Button>
);

export const BackButton: React.FC<ButtonProps> = (props) => (
  <Button $variant="back" {...props}>
    <FaArrowLeft color="#000" size={16} />
  </Button>
);