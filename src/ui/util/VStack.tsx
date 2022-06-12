import styled from "styled-components";

export interface VStackProps {
  children: React.ReactNode;
  margin?: 1;
}

export function VStack({ children }: VStackProps): JSX.Element {
  return (
    <OuterDiv className="VStack">
      {children}
    </OuterDiv>
  );
}

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
