import Head from "next/head";

export default function CustomHead({ title,children }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {children}
    </Head>
  );
}
