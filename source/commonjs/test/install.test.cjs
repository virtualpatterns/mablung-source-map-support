import BaseTest from 'ava'
import FileSystem from 'fs-extra'

const FilePath = __filename
const FileMapPath = `${FilePath}.map`

/* c8 ignore next 1 */
const Test = FileSystem.pathExistsSync(FileMapPath) ? BaseTest : BaseTest.skip

Test('Error(string)', async (test) => {

  let error = new Error('error')

  let errorStack = error.stack.split('\n')
  let [, stackItem] = errorStack

  let pattern = /at (.+):(\d+):(\d+)/i
  let [, errorPath /*, errorLineNumber, errorColumnNumber */] = stackItem.match(pattern)

  test.is(errorPath, FilePath.replace(/release/i, 'source'))

})
