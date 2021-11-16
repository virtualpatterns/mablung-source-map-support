import { CreateLoggedProcess } from '@virtualpatterns/mablung-worker/test'
import { WorkerClient } from '@virtualpatterns/mablung-worker'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FilePath = __filename
const Require = require

const LogPath = FilePath.replace('/release/', '/data/').replace('.test.cjs', '.log')
const LoggedClient = CreateLoggedProcess(WorkerClient, LogPath)
const WorkerPath = Require.resolve('./worker/install.cjs')
const WorkerMapPath = `${WorkerPath}.map`

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  return FileSystem.remove(LogPath)
})

;(FileSystem.pathExistsSync(WorkerMapPath) ? Test : Test.skip)('Error#stack', async (test) => {

  let client = new LoggedClient(WorkerPath)

  await client.whenReady()

  try {

    let error = await client.worker.createError()

    let stack = error.stack.split('\n')
    let [ , item ] = stack

    let pattern = /at Function.createError \((.+):\d+:\d+\)/i
    let [ , path ] = item.match(pattern)

    test.is(path, WorkerPath.replace('/release/', '/source/'))

  } finally {
    await client.exit()
  }

})

Test('handleUncaughtExceptions', async (test) => {

  let client = new LoggedClient(WorkerPath)

  await client.whenReady()

  try {
    await client.worker.throwError()
  } finally {
    test.is(await client.whenExit(), 1)
  }

})
