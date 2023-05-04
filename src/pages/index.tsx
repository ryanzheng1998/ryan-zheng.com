import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { NavBar } from "~/components/home/NavBar";
import { getTranslations, type TranslationList } from "~/server/translation";

interface Props {
  t: Pick<TranslationList, "common" | "test" | "home">;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  return {
    props: {
      t: await getTranslations(locale, ["common", "test", "home"]),
    },
  };
};

const Home: NextPage<Props> = (p) => {
  const t = p.t;

  return (
    <>
      <Head>
        <title>{t.home.title}</title>
        <meta name="description" content={t.home.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid h-screen grid-rows-[auto_1fr]">
        <NavBar />
        <div className="grid place-items-center">
          <div className="text-center">
            <p>{t.home.hi} 👋</p>

            <p>{t.home["My name is"]}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
