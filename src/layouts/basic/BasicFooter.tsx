import Link from "next/link";
import styled from "styled-components";
import { Container } from "../../ui/util/Container";

export interface BasicFooterProps {
}

export function BasicFooter(): JSX.Element {
  return (
    <Outer className="BasicFooter">
      <Container>
        By <Link href="https://ginpei.dev">Ginpei Takanashi</Link>
      </Container>
    </Outer>
  );
}

const Outer = styled.div`
  border-top: thin dashed gray;
  margin-top: 3rem;
  padding-block: 3rem;
`;
