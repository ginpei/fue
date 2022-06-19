import styled from "styled-components";
import { homePagePath } from "../../pages/home/homePageMeta";
import { loginPagePath } from "../../pages/login/loginPageMeta";
import { Container } from "../../ui/util/Container";
import { BasicNavBarLink } from "./BasicNavBarLink";

export interface BasicNavBarProps {
  userMenu?: React.ReactNode;
}

export function BasicNavBar({ userMenu }: BasicNavBarProps): JSX.Element {
  return (
    <Outer className="BasicNavBar">
      <Container>
        <Inner>
          <BasicNavBarLink href={homePagePath()}>🥳 Fue</BasicNavBarLink>
          {userMenu && userMenu}
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
