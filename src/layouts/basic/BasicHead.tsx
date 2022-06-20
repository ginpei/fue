import Head from "next/head";

export interface BasicHeadProps {
  children?: React.ReactNode;
  description?: string;
  title: string;
}

export function BasicHead({ children, description, title }: BasicHeadProps): JSX.Element {
  return (
    <Head>
      <title>{title} | Fue</title>
      {description && (
        <meta name="description" content={description} />
      )}
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  );
}
