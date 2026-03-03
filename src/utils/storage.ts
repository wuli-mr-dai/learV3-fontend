const STORAGE_PREFIX = 'learv3_'

export const storage = {
  set(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(STORAGE_PREFIX + key, serializedValue)
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  },

  get<T = any>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key)
      if (item === null) {
        return defaultValue ?? null
      }
      return JSON.parse(item)
    } catch (error) {
      console.error('Failed to read from localStorage:', error)
      return defaultValue ?? null
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key)
    } catch (error) {
      console.error('Failed to remove from localStorage:', error)
    }
  },

  clear(): void {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  }
}
