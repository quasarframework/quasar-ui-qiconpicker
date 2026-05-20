import { describe, expect, it } from 'vitest'

import { QIconPicker, version } from '../src'
import ioniconsV7 from '../src/components/icon-set/ionicons-v7'
import materialSymbolsOutlined from '../src/components/icon-set/material-symbols-outlined'

describe('QIconPicker', () => {
  it('exports the component and package version', () => {
    expect(QIconPicker.name).toBe('QIconPicker')
    expect(version).toMatch(/^\d+\.\d+\.\d+/)
  })

  it('keeps the public v-model prop aligned with the API metadata', () => {
    expect(QIconPicker.props).toHaveProperty('modelValue')
    expect(QIconPicker.emits).toContain('update:model-value')
  })

  it('supports the current versioned icon-set families', () => {
    const validator = QIconPicker.props.iconSet.validator

    expect(validator('mdi-v6')).toBe(true)
    expect(validator('mdi-v7')).toBe(true)
    expect(validator('ionicons-v6')).toBe(true)
    expect(validator('ionicons-v7')).toBe(true)
    expect(validator('fontawesome-v5')).toBe(true)
    expect(validator('fontawesome-v6')).toBe(true)

    expect(validator('mdi-v5')).toBe(false)
    expect(validator('ionicons-v4')).toBe(false)
  })

  it('generates SVG and ligature icon-set entries for newer Quasar extras', () => {
    expect(ioniconsV7.icons[0]).toHaveProperty('icon')
    expect(ioniconsV7.icons[0].name).toMatch(/^ion/)
    expect(materialSymbolsOutlined.icons[0].name).toMatch(/^sym_o_/)
  })
})
