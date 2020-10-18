import Path from 'path'
import Test from 'ava'
import URL from 'url'

Test('Error(string)', (test) => {

  let error = new Error('error')

  let errorStack = error.stack.split('\n')
  let [, stackItem] = errorStack

  let pattern = /at (.+):(\d+):(\d+)/i
  let [, errorPath, errorLineNumber, errorColumnNumber] = stackItem.match(pattern)

  test.log(`'${Path.relative('', errorPath)}' on line ${errorLineNumber}, column ${errorColumnNumber}`)

  let filePath = URL.fileURLToPath(import.meta.url)
  filePath = filePath.replace(/distributable-esmodule/i, 'source-esmodule')

  test.is(errorPath, filePath)

})
