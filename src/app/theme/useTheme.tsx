/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { themeManager, type ThemeName } from './theme'

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
    return themeManager.getTheme()
  })

  useEffect(() => {
    themeManager.init()
    setCurrentTheme(themeManager.getTheme())
  }, [])

  const setTheme = (theme: ThemeName) => {
    themeManager.setTheme(theme)
    setCurrentTheme(theme)
  }

  const toggleTheme = () => {
    themeManager.toggleTheme()
    setCurrentTheme(themeManager.getTheme())
  }

  return {
    currentTheme,
    setTheme,
    toggleTheme,
    availableThemes: themeManager.getAvailableThemes(),
    getThemeLabel: (theme: ThemeName) => themeManager.getThemeLabel(theme),
  }
}
