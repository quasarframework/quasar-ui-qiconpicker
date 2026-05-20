import { QIconPicker, version } from '@quasar/quasar-ui-qiconpicker'
import type {
  IconName,
  IconNameArray,
  Pagination,
  PaginationProps,
} from '@quasar/quasar-ui-qiconpicker'

const icon: IconName = { name: 'home', tags: ['navigation'] }
const svgIcon: IconName = { name: 'ionAccessibility', icon: 'M0 0h24v24H0z' }
const icons: IconNameArray = [icon]
const pagination: Pagination = { page: 1, rowsPerPage: 20 }
const paginationProps: PaginationProps = {
  input: true,
  maxPages: 5,
  toFn: () => ({ name: 'icons' }),
}

QIconPicker.name?.toString()
version.toString()
icons.at(0)?.name.toString()
svgIcon.icon?.toString()
pagination.page?.toFixed()
paginationProps.maxPages?.toFixed()
