---
title: Advanced
desc: Advanced QIconPicker configuration
keys: developing
examples: QIconPicker
related:
  - /developing/using-qiconpicker
  - /developing/faq
  - /getting-started/installation-types
---

QIconPicker can work as a full built-in icon-set browser, but many applications get a better user experience from a smaller curated collection. Use this page when you need custom icon data, custom rendering, controlled pagination, or a smaller bundle strategy.

## Custom Icon Collections

The `icons` prop accepts an array of objects. Each item must provide a `name`, which is the value emitted through `v-model`. Add an optional `icon` value when the displayed icon should differ from the selected value.

```ts
const icons = [
  { name: 'camera', icon: 'photo_camera' },
  { name: 'github', icon: 'fab fa-github' },
  { name: 'custom-home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
]
```

Use a curated array when your app only needs a specific set of icons, when you want predictable search results, or when UMD/script-tag examples cannot lazy-load `@quasar/extras`.

<MarkdownExample title="Inline SVG Custom Icons" file="InlineSvgCustomIcons"/>

## Built-In Sets And Bundles

The `icon-set` prop lazy-loads icon metadata from `@quasar/extras`. That keeps QIconPicker from shipping large generated icon arrays, but the selected icon-set chunk can still be large for families such as Material Symbols, Font Awesome, Ionicons, and MDI.

Choose the source based on the workflow:

| Workflow                                              | Recommended source |
| ----------------------------------------------------- | ------------------ |
| Browsing a full Quasar icon family                    | `icon-set`         |
| Forms, admin settings, and constrained design systems | `icons`            |
| UMD or CodePen without a bundler                      | `icons`            |
| Private product icons or SVG path data                | `icons`            |

## Custom Icon Rendering

The `icon` slot receives the selected icon name as a string. This keeps the slot ergonomic for templates:

```vue
<template #icon="name">
  <q-btn :icon="name" :label="name" no-caps />
</template>
```

Use the slot when you need labels, custom buttons, extra metadata, or a layout that does not look like a compact icon grid.

<MarkdownExample title="Using Icon Slot" file="UsingIconSlot" no-edit/>

## Controlled Pagination

Use `v-model:model-pagination` when the page state should be visible to your app. QIconPicker updates `totalPages` from the current `icons`, `icon-set`, and `filter` values.

```ts
const pagination = ref({
  itemsPerPage: 10,
  page: 1,
})
```

Pass `pagination-props` when you want to style or configure the internal `QPagination` instance.

<MarkdownExample title="Pagination Custom" file="PaginationCustom" no-edit/>

### Mouse Wheel Pagination

QIconPicker exposes page navigation methods, so app-level interactions can drive the same pagination state as the built-in footer. Wrap the picker in a focusable surface, listen for `wheel`, and call `nextPage()` or `prevPage()` on the component ref.

<MarkdownExample title="Mouse Wheel Pagination" file="WheelPagination" no-edit/>

### Keyboard Pagination

The same exposed methods can be wired to keyboard shortcuts. Use a focusable wrapper and call `nextPage()` on `PageDown` and `prevPage()` on `PageUp` when that interaction fits your app.

<MarkdownExample title="Keyboard Pagination" file="KeyboardPagination" no-edit/>

## Styling Hooks

Start with the public style props before adding custom CSS:

- `dense`
- `size`
- `color`
- `text-color`
- `selected-color`
- `selected-text-color`

For app-level styling, target your own wrapper class and then style QIconPicker's inner structure from there.

```scss
.settings-icon-picker {
  .q-icon-picker__container {
    justify-content: flex-start;
  }

  .q-btn {
    border-radius: 6px;
  }
}
```

Keep a fixed height on QIconPicker or one of its parents so the scroll area can calculate the visible icon region correctly.
