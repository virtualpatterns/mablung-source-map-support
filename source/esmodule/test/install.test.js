import BaseTest from 'ava'
import FileSystem from 'fs-extra'
import Path from 'path'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FileMapPath = `${FilePath}.map`

/* c8 ignore next 1 */
const Test = FileSystem.pathExistsSync(FileMapPath) ? BaseTest : BaseTest.failing

Test('Error(string)', async (test) => {

  let error = new Error('error')

  let errorStack = error.stack.split('\n')
  let [, stackItem] = errorStack

  let pattern = /at (.+):(\d+):(\d+)/i
  let [, errorPath /* , errorLineNumber, errorColumnNumber */] = stackItem.match(pattern)

  /* c8 ignore next 3 */
  if (Test === BaseTest.failing) {
    test.log(`The source map '${Path.relative('', FilePath)}.map' does not exist!`)
  }

  test.is(errorPath, FilePath.replace(/release/i, 'source'))

})
