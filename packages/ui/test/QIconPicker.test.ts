import { describe, expect, it } from 'vitest'

import { QIconPicker, version } from '../src'
import { loadIconSet } from '../src/components/icon-set-loader'

describe('QIconPicker', () => {
  it('exports the component and package version', () => {
    expect(QIconPicker.name).toBe('QIconPicker')
    expect(version).toMatch(/^\d+\.\d+\.\d+/)
  })

  it('keeps the public v-model prop aligned with the API metadata', () => {
    expect(QIconPicker.props).toHaveProperty('modelValue')
    expect(QIconPicker.emits).toContain('update:model-value')
  })

  it('does not expose the removed tag/category API', () => {
    expect(QIconPicker.props).not.toHaveProperty('tags')
    expect(QIconPicker.emits).not.toContain('update:tags')
  })

  it('supports the current versioned icon-set families', () => {
    const validator = QIconPicker.props.iconSet.validator

    expect(validator('mdi-v7')).toBe(true)
    expect(validator('ionicons-v8')).toBe(true)
    expect(validator('fontawesome-v7')).toBe(true)

    expect(validator('mdi-v6')).toBe(false)
    expect(validator('mdi-v5')).toBe(false)
    expect(validator('ionicons-v7')).toBe(false)
    expect(validator('ionicons-v6')).toBe(false)
    expect(validator('ionicons-v4')).toBe(false)
    expect(validator('fontawesome-v6')).toBe(false)
    expect(validator('fontawesome-v5')).toBe(false)
  })

  it('loads icon-set entries from Quasar Extras on demand', async () => {
    const [fontawesomeV7, ioniconsV8, materialSymbolsOutlined] = await Promise.all([
      loadIconSet('fontawesome-v7'),
      loadIconSet('ionicons-v8'),
      loadIconSet('material-symbols-outlined'),
    ])

    expect(fontawesomeV7.icons[0]).toMatchObject({
      name: 'fa-11ty',
      prefix: 'fab',
    })
    expect(fontawesomeV7.icons[0]).toHaveProperty('icon')
    expect(ioniconsV8.icons[0]).toHaveProperty('icon')
    expect(ioniconsV8.icons[0].name).toMatch(/^ion/)
    expect(materialSymbolsOutlined.icons[0]).toHaveProperty('icon')
    expect(materialSymbolsOutlined.icons[0].name).toMatch(/^sym_o_/)
    expect(materialSymbolsOutlined.icons[0]).not.toHaveProperty('tags')
  })
})
