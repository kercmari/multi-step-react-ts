// src/components/ProgressBar.tsx
import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Bar = styled.div`
  width: 100%;
  height: 13px;
  overflow: hidden;
`;

const Progress = styled.div<{ progress: number }>`
  width: ${({ progress }) => `${progress}%`};
  background-color: #333;
  height: 100%;
  transition: width 0.3s ease-in-out;
`;

const StepIndicator = styled.div`
  position: fixed;
  top: 6rem;
  right: 4rem;
  font-size: 2rem;
  color: #000;
  text-align: right;

  & > span {
    font-size: 0.9rem;
    color: #333;
  }

  @media (max-width: 768px) {
    top: 2rem;
    right: 1rem;
  }
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <ProgressContainer>
      <Bar>
        <Progress progress={progress} />
      </Bar>
      <StepIndicator>
        {String(currentStep).padStart(2, '0')}{' '}
        <span>| {String(totalSteps).padStart(2, '0')}</span>
      </StepIndicator>
    </ProgressContainer>
  );
};

export default ProgressBar;