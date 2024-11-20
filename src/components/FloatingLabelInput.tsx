// src/components/FloatingLabelInput.tsx
import React from 'react';
import styled from 'styled-components';

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;

const InputField = styled.input`
  font: 15px/24px 'Lato', Arial, sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  padding: 4px 0;

  &:focus {
    outline: none;
    border-bottom: 2px solid #000;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -20px;
    font-size: 12px;
    color: #000;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 0;
  top: 4px;
  color: #aaa;
  font-size: 16px;
  transition: 0.2s ease all;
  pointer-events: none;
`;

const FloatingLabelInput: React.FC<InputProps> = ({ label, value, onChange }) => (
  <InputContainer>
    <InputField type="text" value={value} onChange={onChange} placeholder=" " />
    <Label>{label}</Label>
  </InputContainer>
);

export default FloatingLabelInput;