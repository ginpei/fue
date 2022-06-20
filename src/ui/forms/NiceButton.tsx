import styled from "styled-components";

export const NiceButton = styled.button`
  padding: 0.5rem 1rem;
  border: thin solid #036;
  border-radius: 3px;
`;

export const PrimaryButton = styled(NiceButton)`
  color: white;
  background-color: #036;
`;

export const DangerButton = styled(NiceButton)`
  color: tomato;
  background-color: #fff9f9;
  border-color: tomato;
`;
