import { useCurrentUser } from '../../dataProviders/currentUser';
import { loginPagePath } from '../../pages/login/loginPageMeta';
import { BasicNavBarLink } from './BasicNavBarLink';
import { BasicUserMenu } from './BasicUserMenu';
import { StraightLayout, StraightLayoutProps } from './StraightLayout';

export interface BasicLayoutProps extends StraightLayoutProps {
}

export function BasicLayout(props: BasicLayoutProps): JSX.Element {
  const currentUser = useCurrentUser();
  const userMenu = currentUser
    ? <BasicUserMenu />
    : <BasicNavBarLink href={loginPagePath()}>Login</BasicNavBarLink>

  return (
    <StraightLayout {...props} userMenu={userMenu} />
  );
}
