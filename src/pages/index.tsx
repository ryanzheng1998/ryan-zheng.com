import { type GetStaticProps, type NextPage } from "next";
import { getTranslations, type TranslationList } from "~/server/translation";

interface Props {
  i18n: Pick<TranslationList, "common" | "test">;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  return {
    props: {
      i18n: await getTranslations(locale, ["common", "test"]),
    },
  };
};

const Home: NextPage<Props> = (p) => {
  console.log(p);
  return (
    <div>
      {p.i18n.common.hello} {p.i18n.test.b}
    </div>
  );
};

export default Home;
