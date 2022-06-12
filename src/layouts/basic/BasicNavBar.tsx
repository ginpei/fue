import styled from "styled-components";
import { homePagePath } from "../../pages/home/homePageMeta";
import { Container } from "../../ui/util/Container";
import { BasicNavBarLink } from "./BasicNavBarLink";

export interface BasicNavBarProps {
}

export function BasicNavBar(): JSX.Element {
  return (
    <Outer className="BasicNavBar">
      <Container>
        <Inner>
          <BasicNavBarLink href={homePagePath()}>🥳 Fue</BasicNavBarLink>
          <BasicNavBarLink href={loginPagePath()}>Login</BasicNavBarLink>
        </Inner>
      </Container>
    </Outer>
  );
}

const Outer = styled.div`
  background-color: #036;
  color: white;
  `;
  
const Inner = styled.div`
  display: flex;
  justify-content: space-between;
`;

function loginPagePath() {
  return "#TODO";
}