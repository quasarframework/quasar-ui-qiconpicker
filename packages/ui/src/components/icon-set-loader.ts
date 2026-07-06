type IconEntry = {
  name: string
  icon: string
  prefix?: string
}

type IconSet = {
  name: IconSetName
  icons: IconEntry[]
}

type IconNamesModule = string[] | { default: string[] }
type IconExportsModule = Record<string, unknown>
type IconSetConfig = {
  createEntry: (iconName: string, icon: string, iconNames: Set<string>) => IconEntry
}

export const iconSetNames = [
  'material-icons',
  'material-icons-outlined',
  'material-icons-round',
  'material-icons-sharp',
  'material-symbols-outlined',
  'material-symbols-rounded',
  'material-symbols-sharp',
  'ionicons-v8',
  'mdi-v7',
  'fontawesome-v7',
  'eva-icons',
  'themify',
  'line-awesome',
  'bootstrap-icons',
] as const

export type IconSetName = (typeof iconSetNames)[number]

function pascalToKebab(value: string): string {
  return value
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

function pascalToSnake(value: string): string {
  return pascalToKebab(value).replace(/-/g, '_')
}

function removePrefix(value: string, prefix: string): string {
  if (value.startsWith(prefix) === false) {
    throw new Error(`Icon export ${value} does not start with expected prefix ${prefix}`)
  }

  return value.slice(prefix.length)
}

function createSvgEntry(prefix: string, namePrefix = '') {
  return (iconName: string, icon: string): IconEntry => ({
    name: `${namePrefix}${pascalToKebab(removePrefix(iconName, prefix))}`,
    icon,
  })
}

function createMaterialSvgEntry(prefix: string, namePrefix = '') {
  return (iconName: string, icon: string): IconEntry => ({
    name: `${namePrefix}${pascalToSnake(removePrefix(iconName, prefix))}`,
    icon,
  })
}

function getIconNames(module: IconNamesModule): string[] {
  return Array.isArray(module) ? module : module.default
}

function getIconExports(module: IconExportsModule): Record<string, string> {
  return Object.fromEntries(
    Object.entries(module).filter(
      (entry): entry is [string, string] => typeof entry[1] === 'string',
    ),
  )
}

function createIconSet(
  name: IconSetName,
  iconNamesModule: IconNamesModule,
  extrasModule: IconExportsModule,
): IconSet {
  const iconNames = getIconNames(iconNamesModule)
  const iconNamesSet = new Set(iconNames)
  const extras = getIconExports(extrasModule)
  const config = iconSetConfigs[name]

  return {
    name,
    icons: iconNames.map((iconName) => {
      const icon = extras[iconName]

      if (typeof icon !== 'string') {
        throw new Error(`QIconPicker: ${name} is missing @quasar/extras export ${iconName}`)
      }

      return config.createEntry(iconName, icon, iconNamesSet)
    }),
  }
}

const iconSetConfigs: Record<IconSetName, IconSetConfig> = {
  'material-icons': {
    createEntry: createMaterialSvgEntry('mat'),
  },
  'material-icons-outlined': {
    createEntry: createMaterialSvgEntry('outlined', 'o_'),
  },
  'material-icons-round': {
    createEntry: createMaterialSvgEntry('round', 'r_'),
  },
  'material-icons-sharp': {
    createEntry: createMaterialSvgEntry('sharp', 's_'),
  },
  'material-symbols-outlined': {
    createEntry: createMaterialSvgEntry('symOutlined', 'sym_o_'),
  },
  'material-symbols-rounded': {
    createEntry: createMaterialSvgEntry('symRounded', 'sym_r_'),
  },
  'material-symbols-sharp': {
    createEntry: createMaterialSvgEntry('symSharp', 'sym_s_'),
  },
  'mdi-v7': {
    createEntry: createSvgEntry('mdi', 'mdi-'),
  },
  'ionicons-v8': {
    createEntry: (iconName, icon) => ({ name: iconName, icon }),
  },
  'fontawesome-v7': {
    createEntry: (iconName, icon) => ({
      name: `fa-${pascalToKebab(iconName.slice(3))}`,
      icon,
      prefix: iconName.slice(0, 3),
    }),
  },
  'line-awesome': {
    createEntry: (iconName, icon, iconNames) => {
      const rawName = removePrefix(iconName, 'la')
      const isSolid = rawName.endsWith('Solid')
      const baseName = isSolid ? rawName.slice(0, -'Solid'.length) : rawName

      return {
        name: `la-${pascalToKebab(baseName)}`,
        icon,
        prefix: isSolid ? 'las' : iconNames.has(`${iconName}Solid`) ? 'lar' : 'lab',
      }
    },
  },
  'eva-icons': {
    createEntry: createSvgEntry('eva', 'eva-'),
  },
  themify: {
    createEntry: createSvgEntry('ti', 'ti-'),
  },
  'bootstrap-icons': {
    createEntry: createSvgEntry('bi', 'bi-'),
  },
}

const iconSetLoaders: Record<IconSetName, () => Promise<IconSet>> = {
  'material-icons': () =>
    Promise.all([
      import('@quasar/extras/material-icons/icons.json'),
      import('@quasar/extras/material-icons'),
    ]).then(([icons, extras]) => createIconSet('material-icons', icons, extras)),
  'material-icons-outlined': () =>
    Promise.all([
      import('@quasar/extras/material-icons-outlined/icons.json'),
      import('@quasar/extras/material-icons-outlined'),
    ]).then(([icons, extras]) => createIconSet('material-icons-outlined', icons, extras)),
  'material-icons-round': () =>
    Promise.all([
      import('@quasar/extras/material-icons-round/icons.json'),
      import('@quasar/extras/material-icons-round'),
    ]).then(([icons, extras]) => createIconSet('material-icons-round', icons, extras)),
  'material-icons-sharp': () =>
    Promise.all([
      import('@quasar/extras/material-icons-sharp/icons.json'),
      import('@quasar/extras/material-icons-sharp'),
    ]).then(([icons, extras]) => createIconSet('material-icons-sharp', icons, extras)),
  'material-symbols-outlined': () =>
    Promise.all([
      import('@quasar/extras/material-symbols-outlined/icons.json'),
      import('@quasar/extras/material-symbols-outlined'),
    ]).then(([icons, extras]) => createIconSet('material-symbols-outlined', icons, extras)),
  'material-symbols-rounded': () =>
    Promise.all([
      import('@quasar/extras/material-symbols-rounded/icons.json'),
      import('@quasar/extras/material-symbols-rounded'),
    ]).then(([icons, extras]) => createIconSet('material-symbols-rounded', icons, extras)),
  'material-symbols-sharp': () =>
    Promise.all([
      import('@quasar/extras/material-symbols-sharp/icons.json'),
      import('@quasar/extras/material-symbols-sharp'),
    ]).then(([icons, extras]) => createIconSet('material-symbols-sharp', icons, extras)),
  'ionicons-v8': () =>
    Promise.all([
      import('@quasar/extras/ionicons-v8/icons.json'),
      import('@quasar/extras/ionicons-v8'),
    ]).then(([icons, extras]) => createIconSet('ionicons-v8', icons, extras)),
  'mdi-v7': () =>
    Promise.all([import('@quasar/extras/mdi-v7/icons.json'), import('@quasar/extras/mdi-v7')]).then(
      ([icons, extras]) => createIconSet('mdi-v7', icons, extras),
    ),
  'fontawesome-v7': () =>
    Promise.all([
      import('@quasar/extras/fontawesome-v7/icons.json'),
      import('@quasar/extras/fontawesome-v7'),
    ]).then(([icons, extras]) => createIconSet('fontawesome-v7', icons, extras)),
  'line-awesome': () =>
    Promise.all([
      import('@quasar/extras/line-awesome/icons.json'),
      import('@quasar/extras/line-awesome'),
    ]).then(([icons, extras]) => createIconSet('line-awesome', icons, extras)),
  'eva-icons': () =>
    Promise.all([
      import('@quasar/extras/eva-icons/icons.json'),
      import('@quasar/extras/eva-icons'),
    ]).then(([icons, extras]) => createIconSet('eva-icons', icons, extras)),
  themify: () =>
    Promise.all([
      import('@quasar/extras/themify/icons.json'),
      import('@quasar/extras/themify'),
    ]).then(([icons, extras]) => createIconSet('themify', icons, extras)),
  'bootstrap-icons': () =>
    Promise.all([
      import('@quasar/extras/bootstrap-icons/icons.json'),
      import('@quasar/extras/bootstrap-icons'),
    ]).then(([icons, extras]) => createIconSet('bootstrap-icons', icons, extras)),
}

export function loadIconSet(name: IconSetName): Promise<IconSet> {
  return iconSetLoaders[name]()
}
