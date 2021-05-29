import { Processor } from 'windicss/lib'
import { HTMLParser } from 'windicss/utils/parser'

export function generateStyles(html: string) {
  // Get windi processor
  const whitelist = [
    'dark:text-light-300',
    'text-dark-100',
  ].join(' ')
  const processor = new Processor({
    darkMode: 'class',
  })

  // Parse all classes and put into one line to simplify operations
  const htmlClasses = new HTMLParser(html)
    .parseClasses()
    .map(i => i.result)
    .join(' ')

  // Generate preflight based on the html we input
  const preflightSheet = processor.preflight(html)

  // Process the html classes to an interpreted style sheet
  const interpretedSheet = processor.interpret(`${htmlClasses} ${whitelist}`).styleSheet

  // Build styles
  const APPEND = false
  const MINIFY = false
  const styles = interpretedSheet.extend(preflightSheet, APPEND).build(MINIFY)

  // console.log('Styles', styles)

  return styles
}
