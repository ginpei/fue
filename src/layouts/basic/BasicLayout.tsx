import { useCurrentUser } from '../../dataProviders/currentUser';
import { homePagePath } from '../../pages/home/homePageMeta';
import { loginPagePath } from '../../pages/login/loginPageMeta';
import { BasicNavBarLink } from './BasicNavBarLink';
import { StraightLayout, StraightLayoutProps } from './StraightLayout';

export interface BasicLayoutProps extends StraightLayoutProps {
}

export function BasicLayout(props: BasicLayoutProps): JSX.Element {
  const currentUser = useCurrentUser();
  const UserMenu = currentUser
    ? <BasicNavBarLink href={homePagePath()}>Home</BasicNavBarLink>
    : <BasicNavBarLink href={loginPagePath()}>Login</BasicNavBarLink>

  return (
    <StraightLayout {...props} userMenu={UserMenu} />
  );
}
