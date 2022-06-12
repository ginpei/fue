import Head from 'next/head'
import { Container } from "../../ui/util/Container";
import { BasicNavBar } from './BasicNavBar';

export interface BasicLayoutProps {
  children: React.ReactNode;
  description?: string;
  name: string;
  title: string;
}

export function BasicLayout({ children, description, name, title }: BasicLayoutProps): JSX.Element {
  return (
    <div className={`BasicLayout ${name}`}>
      <Head>
        <title>{title} | Fue</title>
        {description && (
          <meta name="description" content={description} />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicNavBar />
      <Container>{children}</Container>
    </div>
  );
}
