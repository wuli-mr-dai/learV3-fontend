import { describe, it, expect, afterEach } from 'vitest'
import { storage } from '@/utils/storage'

describe('storage utility', () => {
  const testKey = 'test_key'
  const testValue = { name: 'test', value: 123 }

  afterEach(() => {
    localStorage.removeItem(testKey)
  })

  it('set and get', () => {
    storage.set(testKey, testValue)
    const result = storage.get<typeof testValue>(testKey)
    expect(result).toEqual(testValue)
  })

  it('get with default value', () => {
    const result = storage.get<typeof testValue>(testKey, testValue)
    expect(result).toEqual(testValue)
  })

  it('remove', () => {
    storage.set(testKey, testValue)
    storage.remove(testKey)
    const result = storage.get(testKey)
    expect(result).toBeNull()
  })

  it('clear', () => {
    storage.set(testKey, testValue)
    storage.set('another_key', 'value')
    storage.clear()
    const result = storage.get(testKey)
    expect(result).toBeNull()
  })
})
