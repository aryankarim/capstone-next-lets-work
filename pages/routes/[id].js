import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Id({ params }) {
  return (
    <div>
      hi
      {console.log(params)}
    </div>
  );
}

export async function getServerSideProps(context) {
  const params = context.params;
  return {
    props: {
      params,
      ...(await serverSideTranslations(context.locale, ["navbar"])),
    },
  };
}
