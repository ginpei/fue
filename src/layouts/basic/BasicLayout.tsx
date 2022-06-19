import { useCurrentUser } from '../../dataProviders/currentUser';
import { homePagePath } from '../../pages/home/homePageMeta';
import { loginPagePath } from '../../pages/login/loginPageMeta';
import { logoutPagePath } from '../../pages/logout/logoutPageMeta';
import { BasicNavBarLink } from './BasicNavBarLink';
import { StraightLayout, StraightLayoutProps } from './StraightLayout';

export interface BasicLayoutProps extends StraightLayoutProps {
}

export function BasicLayout(props: BasicLayoutProps): JSX.Element {
  const currentUser = useCurrentUser();
  const userMenu = currentUser
    ? <UserMenu />
    : <BasicNavBarLink href={loginPagePath()}>Login</BasicNavBarLink>

  return (
    <StraightLayout {...props} userMenu={userMenu} />
  );
}

export function UserMenu(): JSX.Element {
  return (
    <>
      <BasicNavBarLink href={logoutPagePath()}>Logout</BasicNavBarLink>
      <BasicNavBarLink href={homePagePath()}>Home</BasicNavBarLink>
    </>
  );
}
