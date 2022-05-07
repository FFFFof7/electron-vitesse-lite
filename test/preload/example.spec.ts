import { describe, expect, test } from 'vitest'
import { estT } from '../../packages/preload/utils'
describe('preload test should be defined', () => {
  test('1 plus 1 equals 2', () => {
    expect(1 + 1).toBe(2)
  })
  test('estT', () => {
    const str = '1'
    expect(estT(str)).toBe('2')
  })
})
