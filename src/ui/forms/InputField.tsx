import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";

export interface InputFieldProps extends InputProps {
  label: string;
}

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function InputField({ label, ...inputProps }: InputFieldProps): JSX.Element {
  return (
    <Root className="InputField">
      <Label>{label}</Label>
      <Input {...inputProps} />
    </Root>
  );
}

const Root = styled.label`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
`;

const Input = styled.input<{ ref?: any }>`
  width: 100%;
`;
