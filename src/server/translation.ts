/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from "zod";

// wish import folder is supported
export interface TranslationList {
  common: typeof import("public/locales/default/common.json");
  test: typeof import("public/locales/default/test.json");
}

export const getTranslations = async <T extends keyof TranslationList>(
  locale: string | undefined,
  files: T[]
): Promise<Pick<TranslationList, T>> => {
  const promises = files.map((file) => getTranslation(locale, file));

  const results = await Promise.all(promises);

  return Object.fromEntries(
    results.map((result, index) => [files[index], result])
  ) as Pick<TranslationList, T>;
};

const getTranslation = async <T extends keyof TranslationList>(
  locale: string | undefined,
  file: T
): Promise<TranslationList[T]> => {
  const defaultPromise = getLocaleFile("default", file);
  // skip non-existent locale files
  const localePromise =
    locale === undefined ? {} : getLocaleFile(locale, file).catch(() => ({}));

  const [defaultResult, localeResult] = await Promise.all([
    defaultPromise,
    localePromise,
  ]);

  // Doing type checking is too expensive here, so we just cast it to the correct type.
  return {
    ...defaultResult,
    ...localeResult,
  } as TranslationList[T];
};

const getLocaleFile = async (locale: string, file: string) => {
  const result: unknown = await import(`public/locales/${locale}/${file}.json`);

  const type = z.object({ default: z.record(z.string()) });

  return type.parse(result).default;
};
