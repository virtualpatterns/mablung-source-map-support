import Path from 'path'
import Test from 'ava'

Test('Error(string)', (test) => {

  let error = new Error('error')

  let errorStack = error.stack.split('\n')
  let [, stackItem] = errorStack

  let pattern = /at (.+):(\d+):(\d+)/i
  let [, errorPath, errorLineNumber, errorColumnNumber] = stackItem.match(pattern)

  test.log(`'${Path.relative('', errorPath)}' on line ${errorLineNumber}, column ${errorColumnNumber}`)

  let filePath = __filename
  filePath = filePath.replace(/release/i, 'source')

  test.is(errorPath, filePath)

})
