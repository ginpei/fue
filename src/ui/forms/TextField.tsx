import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import styled from "styled-components";

export interface TextFieldProps extends TextareaProps {
  label: string;
}

type TextareaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export function TextField({ label, ...inputProps }: TextFieldProps): JSX.Element {
  return (
    <Root className="TextField">
      <Label>{label}</Label>
      <Textarea {...inputProps} />
    </Root>
  );
}

const Root = styled.label`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
`;

const Textarea = styled.textarea<{ ref?: any }>`
  width: 100%;
`;
