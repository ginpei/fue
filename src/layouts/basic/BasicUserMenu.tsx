import styled from "styled-components";
import { homePagePath } from "../../pages/home/homePageMeta";
import { logoutPagePath } from "../../pages/logout/logoutPageMeta";
import { BasicNavBarLink } from "./BasicNavBarLink";

export interface BasicUserMenuProps {
}

export function BasicUserMenu(): JSX.Element {
  return (
    <UserMenuBlock className="BasicUserMenu">
      <BasicNavBarLink href={homePagePath()}>Home</BasicNavBarLink>
      <BasicNavBarLink href={logoutPagePath()}>Logout</BasicNavBarLink>
    </UserMenuBlock>
  );
}

const UserMenuBlock = styled.div`
  display: flex;
  gap: 1rem;
`;
