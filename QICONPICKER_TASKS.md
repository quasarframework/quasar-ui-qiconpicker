# QIconPicker Task List

Last Updated: 2026-05-20

Use this file as the per-repo checklist for migrating QIconPicker to the current shared app-extension standard.

## Repo Identity

- Repo: `quasar-ui-qiconpicker`
- Branch: `v3-beta`
- Target version: `3.0.0-beta.0`
- Base branch: `origin/main`
- Target `@quasar/app-vite` version verified as published: `3.0.0-beta.18`

## Completed

- [x] Branch created from the correct base
- [x] Repo moved to `packages/` layout
- [x] Root workspace migrated to pnpm
- [x] Root `.npmrc` aligned with the shared standard
- [x] Legacy repo-owned `yarn.lock` / `package-lock.json` / other package-manager lockfiles removed where pnpm is canonical
- [x] Root scripts aligned with the shared standard
- [x] `oxlint` added at the root
- [x] `oxfmt` added at the root
- [x] Package-local ESLint configs/scripts removed in favor of `oxlint`
- [x] Package-local Prettier configs/scripts removed in favor of `oxfmt`
- [x] Legacy `jsconfig.json` files removed where no longer needed
- [x] UI package Sass files converted from `.sass` to `.scss`
- [x] Docs examples converted away from legacy `lang="sass"` blocks where encountered
- [x] Sass build scripts use the modern JS API, for example `compileAsync`, instead of deprecated `sass.render` / `renderSync`
- [x] Root `ci:publish` and `ci:publish:beta` scripts aligned
- [x] App extension package migrated to `@quasar/app-vite`
- [x] App extension prompt scripts migrated to an explicit prompt dependency, such as `@clack/prompts` (not applicable; QIconPicker has no prompts)
- [x] App extension registered commands audited for `{ args, params }` usage against the current app-vite beta (not applicable; QIconPicker registers no commands)
- [x] Old webpack-only app-extension path removed
- [x] UI JavaScript build migrated from Rollup to Rolldown
- [x] Direct Rollup/Babel bundler dependencies removed where no longer needed
- [x] Build-step ordering/failure propagation reviewed for determinism in the UI package
- [x] Package entrypoint semantics reviewed
- [x] Docs package linked to workspace UI package
- [x] Dev package linked to workspace UI package (not applicable; QIconPicker has no dev package)
- [x] Quasar docs package uses `tsconfig.json` extending `./.quasar/tsconfig.json`
- [x] Quasar docs Vue SFC examples use `<script setup lang="ts">`
- [x] Docs package migrated to shared `md-plugins` flow
- [x] Docs latest-news/changelog page normalized to `Releases`
- [x] Docs secondary navigation uses the shared `Other` menu grouping
- [x] Netlify config exists and uses the workspace publish path (`packages/docs/dist/spa`)
- [x] Shared workspace tooling versions aligned where needed
- [x] Packages audited against latest compatible releases and updated where appropriate
- [x] `@quasar/extras` updated to latest published `1.18.0`
- [x] Versioned icon sets aligned to the latest two supported families: `mdi-v6`/`mdi-v7`, `ionicons-v6`/`ionicons-v7`, and `fontawesome-v5`/`fontawesome-v6`
- [x] New Material Symbols icon sets added: `material-symbols-outlined`, `material-symbols-rounded`, and `material-symbols-sharp`
- [x] Removed stale generated icon sets for `mdi-v4`, `mdi-v5`, and `ionicons-v4`
- [x] Peer dependency warnings resolved
- [x] Real tests added
- [x] GitHub Actions use Node 24-native action versions, for example `actions/checkout@v6`, `actions/setup-node@v5`, and `pnpm/action-setup@v6`
- [x] READMEs updated to the new layout and package-manager guidance

## Current High Priority

- [x] UI package builds successfully
- [x] UI package builds with Rolldown and published JS filenames are preserved
- [x] Docs package builds successfully with `@quasar/app-vite` and `md-plugins`
- [x] Dev package builds successfully (not applicable; QIconPicker has no dev package)
- [x] Real tests exist and run at the root
- [x] Root typings are strong enough for IDE use
- [x] Root and subpath consumer type smoke checks pass
- [x] Docs/API JSON generation has been audited against the runtime source for `model-value` / `update:model-value`
- [x] Root lint command is clean
- [x] Root format check is clean
- [x] CI workflow exists
- [ ] Coverage baseline captured and expanded beyond the core render smoke tests
- [ ] Runtime/composable logic audit completed with regression coverage for discovered bugs
- [ ] External consumer / IDE verification completed for typing-sensitive fixes
- [ ] Repo-wide JavaScript files audited and converted to TypeScript where practical; remaining `.js` files are intentional runtime, template, generated, or published-output compatibility files
- [ ] API drift warnings/checks are enabled and clean

## Current Medium Priority

- [x] Legacy JSON/API metadata reviewed and corrected for `model-value` and `update:model-value`
- [x] Docs markdown pipeline aligned with QCalendar's `@md-plugins/vite-md-plugin` and `@md-plugins/vite-examples-plugin` setup
- [x] Docs release/changelog naming normalized to `Releases`
- [x] Docs `Other` menu groups releases, contact/help, and contributing links consistently
- [x] Docs build checked for Sass Embedded parser compatibility
- [x] Docs build checked for Rolldown deep-import resolution issues
- [x] Docs/dev production chunking uses `build.rolldownOptions` instead of legacy `build.rollupOptions`
- [x] Netlify deploy settings/config audited after migration from legacy docs paths
- [x] Package versions reviewed against latest published compatible releases
- [x] Peer dependency check is clean
- [x] Build system reviewed for parity with current shared Rolldown practices
- [x] UI package build scripts converted to TypeScript, using QCalendar/QMarkdown as the template
- [x] UI API/type generation does not depend on obsolete `quasar-json-api` / npm `zlib`; use the local TypeScript generator pattern where practical
- [ ] Remaining `.js` files documented with a reason to keep them, or scheduled for TypeScript conversion
- [ ] Shared/generated docs styles reviewed for deprecated Sass `@import`; migrate to `@use` where practical
- [ ] CI policy decided for API drift warnings vs failures
- [ ] Coverage plan defined
- [x] Large icon-set bundle strategy reviewed; built-in icon sets are lazy loaded for ESM/CJS/app builds while UMD remains intentionally single-file

## Initial Findings

- The repo was in the old flat layout: `ui/`, `docs`, and `app-extension`; it has been moved to `packages/`.
- Root scripts used Yarn and did not expose the shared `build:ui`, `build:docs`, lint, format, test, or publish scripts; this has been updated.
- Docs were webpack-era Quasar CLI: `docs/quasar.conf.js`, `@quasar/app`, custom markdown loader, and `jsconfig.json`; docs now use `@quasar/app-vite`, qPress, and md-plugins.
- App extension supported both app-webpack and app-vite 1/2 era paths and imported boot helpers from `quasar/wrappers`; it is now Vite-only.
- UI build used Rollup/Babel-era dependencies and legacy Sass files; it now uses Rolldown and SCSS.
- No root pnpm lockfile/workspace file existed; both now exist.

## Notes

- Validation commands passing:
  - `pnpm install`
  - `pnpm format:check`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm peers check`
  - `pnpm build`
- Build warnings:
  - Built-in icon sets are lazy loaded for ESM/CJS/app builds. `pnpm build` now reports `dist/index.esm.js` at about `14 KB` and docs `e.QIconPicker` at about `249 KB`, down from about `8.5 MB` and `5.6 MB`.
  - Individual icon-set chunks can still exceed the default chunk warning threshold; this is expected for large Quasar Extras families like Material Icons and Ionicons.
  - The UMD bundle intentionally keeps icon-set data inlined for single-file CDN/script-tag compatibility.
- Docs config note:
  - qPress/md-plugin Vite factories are cast at the config boundary to avoid duplicate Vite plugin type identities when optional peer sets resolve Vite differently.
- Local environment note:
  - A stale root `node_modules/quasar` directory from the old install caused Quasar CLI to report `Pkg quasar v2.12.0`; removing the stale artifact made the docs build report the installed `v2.19.3`.
- Follow-up repos to apply the same pattern to:
  - `quasar-ui-qmediaplayer`
  - `quasar-ui-qflashcard`
