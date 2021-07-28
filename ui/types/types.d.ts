export type NumberArray = number[]
export type StringArray = string[]

export type IconName = {
  name : string
}

export type IconNameArray = IconName[]

export type Pagination = {
  /**
   * Page number (1-based)
   */
  page? : number
  /**
   * How many rows per page? 0 means Infinite
   */
  rowsPerPage? : number
}

