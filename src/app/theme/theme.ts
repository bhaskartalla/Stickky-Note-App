/* ═════════════════════════════════════════════════════════════════════════════
   THEME MANAGER UTILITY
   Centralized theme management with localStorage persistence
═════════════════════════════════════════════════════════════════════════════ */

export type ThemeName = 'default' | 'light' | 'high-contrast'

export interface ThemeConfig {
  colors: {
    bg: string
    surface: string
    surface2: string
    border: string
    accent: string
    accent2: string
    accent3: string
    text: string
    muted: string
    noteGreen: string
    notePink: string
    noteYellow: string
    noteBlue: string
    noteLilac: string
  }
}

const STORAGE_KEY = 'app-theme'
const DEFAULT_THEME: ThemeName = 'default'

class ThemeManager {
  private currentTheme: ThemeName = DEFAULT_THEME
  private availableThemes: ThemeName[] = ['default', 'light', 'high-contrast']

  init() {
    const saved = this.getSavedTheme()
    this.setTheme(saved)
  }

  private getSavedTheme(): ThemeName {
    if (typeof window === 'undefined') return DEFAULT_THEME

    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    return saved && this.availableThemes.includes(saved) ? saved : DEFAULT_THEME
  }

  setTheme(theme: ThemeName) {
    this.currentTheme = theme

    // Update DOM attribute for CSS theme selector
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute(
        'data-theme',
        theme === 'default' ? '' : theme
      )

      localStorage.setItem(STORAGE_KEY, theme)
    }
  }

  getTheme(): ThemeName {
    return this.currentTheme
  }

  toggleTheme() {
    const next: ThemeName =
      this.currentTheme === 'default' ? 'light' : 'default'
    this.setTheme(next)
  }

  getAvailableThemes(): ThemeName[] {
    return this.availableThemes
  }

  getThemeLabel(theme: ThemeName): string {
    const labels: Record<ThemeName, string> = {
      default: 'Dark',
      light: 'Light',
      'high-contrast': 'High Contrast',
    }
    return labels[theme]
  }
}

// Singleton instance
export const themeManager = new ThemeManager()
