import Head from 'next/head'
import styled from 'styled-components';
import { Container } from "../../ui/util/Container";
import { VStack } from '../../ui/util/VStack';
import { BasicFooter } from './BasicFooter';
import { BasicHead } from './BasicHead';
import { BasicNavBar } from './BasicNavBar';

export interface StraightLayoutProps {
  children: React.ReactNode;
  description?: string;
  name: string;
  title: string;
  userMenu?: React.ReactNode;
}

export function StraightLayout({ children, description, name, title, userMenu }: StraightLayoutProps): JSX.Element {
  return (
    <div className={`StraightLayout ${name}`}>
      <BasicHead description={description} title={title} />
      <VStack>
        <BasicNavBar userMenu={userMenu} />
        <Main>
          <Container>
            <VStack>{children}</VStack>
          </Container>
        </Main>
        <BasicFooter />
      </VStack>
    </div>
  );
}

const Main = styled.div`
  min-height: 50vh;
`;
