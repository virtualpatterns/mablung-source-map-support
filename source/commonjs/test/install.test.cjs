import FileSystem from 'fs-extra'
import Test from 'ava'

const FilePath = __filename
const FileMapPath = `${FilePath}.map`

Test('Error(string)', async (test) => {

  let error = new Error('error')

  let errorStack = error.stack.split('\n')
  let [, stackItem] = errorStack

  let pattern = /at (.+):(\d+):(\d+)/i
  let [, errorPath /*, errorLineNumber, errorColumnNumber */] = stackItem.match(pattern)

  ;(FileSystem.pathExistsSync(FileMapPath) ? test.is : test.is.skip)(errorPath, FilePath.replace(/release/i, 'source'))

})
