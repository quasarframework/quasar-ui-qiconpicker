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

export type PaginationProps = {
  /**
   * Minimum page (must be lower than 'max')
   */
  min? : number
  /**
   * Number of last page (must be higher than 'min')
   */
  max? : number
  /**
   * Maximum number of page links to display at a time; 0 means Infinite
   */
  maxPages? : number
  /**
   * Put component in disabled mode
   */
  disable? : boolean
  /**
   * Use an input instead of buttons
   */
  input? : boolean
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconPrev? : string
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconNext? : string
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconFirst? : string
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconLast? : string
  /**
   * Generate link for page buttons; For best performance, reference it from your scope and do not define it inline
   */
  toFn? : function 
  /**
   * Show boundary button links
   */
  boundaryLinks? : boolean
  /**
   * Always show first and last page buttons (if not using 'input')
   */
  boundaryNumbers? : boolean
  /**
   * Show direction buttons
   */
  directionLinks? : boolean
  /**
   * Show ellipses (...) when pages are available
   */
  ellipsis? : boolean
  /**
   * Color name for component from the Quasar Color Palette
   */
  color? : string
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor? : string
  /**
   * Color name for component from the Quasar Color Palette
   */
  activeColor? : string
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  activeTextColor? : string
  /**
   * Notify the component that the background is a dark color (useful when you are using it along with the 'input' prop)
   */
  dark? : boolean
  /**
   * Style definitions to be attributed to the input (if using one)
   */
  inputStyle? : array | string | object
  /**
   * Class definitions to be attributed to the input (if using one)
   */
  inputClass? : array | string | object
  /**
   * Button size in CSS units, including unit name
   */
  size? : string
  /**
   * Configure buttons material ripple (disable it by setting it to 'false' or supply a config object); Does not applies to boundary and ellipsis buttons
   */
  ripple? : boolean | object
  /**
   * Makes a circle shaped button for all buttons
   */
  round? : boolean
  /**
   * Applies a more prominent border-radius for a squared shape button for all buttons
   */
  rounded? : boolean
  /**
   * Use 'flat' design for current page button
   */
  flat? : boolean
  /**
   * Use 'outline' design for current page button
   */
  outline? : boolean
  /**
   * Remove shadow for current page button
   */
  unelevated? : boolean
  /**
   * Use 'push' design for current page button
   */
  push? : boolean
  /**
   * Applies a glossy effect for all buttons
   */
  glossy? : boolean
  /**
   * Dense mode; occupies less space
   */
  dense? : boolean
  /**
   * Apply custom padding (vertical [horizontal]); Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl); Also removes the min width and height when set
   */
  padding? : string

}

