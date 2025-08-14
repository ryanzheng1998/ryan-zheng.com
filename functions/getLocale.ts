export function getLocale(request: Request) {
  const acceptLang = request.headers.get('accept-language')
  if (!acceptLang) return undefined

  const preferredLanguages = acceptLang
    .split(',')
    .map((lang) => lang.split(';')[0]!.trim().toLowerCase())

  for (const lang of preferredLanguages) {
    const baseLang = lang.split('-')[0] // e.g., "zh-TW" → "zh"

    return baseLang
  }

  return undefined
}
