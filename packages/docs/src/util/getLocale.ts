type LegacyNavigator = Navigator & {
  userLanguages?: string[]
  browserLanguages?: string[]
}

export const getLocale = (): string => {
  if (navigator.languages && navigator.languages.length > 0) {
    return navigator.languages[0] || 'en-US'
  }

  const legacyNavigator = navigator as LegacyNavigator
  return (
    legacyNavigator.userLanguages?.[0] ||
    navigator.language ||
    legacyNavigator.browserLanguages?.[0] ||
    'en-US'
  )
}
