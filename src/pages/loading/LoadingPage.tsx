import styled from "styled-components";
import { BasicHead } from "../../layouts/basic/BasicHead";
import { BasicNavBar } from "../../layouts/basic/BasicNavBar";
import { Container } from "../../ui/util/Container";
import { VStack } from "../../ui/util/VStack";

export interface LoadingPageProps {
  children?: React.ReactNode;
  title?: string;
}

export function LoadingPage({ children, title = "…" }: LoadingPageProps): JSX.Element {
  return (
    <div className="LoadingPage">
      <BasicHead title={title} />
      <VStack>
        <BasicNavBar />
        <Main>
          <Container>
            {children}
          </Container>
        </Main>
      </VStack>
    </div>
  );
}

// TODO extract and merge with StraightLayout's one
const Main = styled.div`
  min-height: 50vh;
`;
