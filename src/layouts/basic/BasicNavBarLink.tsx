import Link, { LinkProps } from "next/link";
import styled from "styled-components";

export interface BasicNavBarLinkProps extends LinkProps {
  children: React.ReactNode;
}

export function BasicNavBarLink({ children, ...props }: BasicNavBarLinkProps): JSX.Element {
  return (
    <Link {...props} passHref>
      <A>{children}</A>
    </Link>
  );
}

const A = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: underline;
  }
`;
