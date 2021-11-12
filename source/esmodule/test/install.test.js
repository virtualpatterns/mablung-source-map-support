import { CreateLoggedProcess } from '@virtualpatterns/mablung-worker/test'
import { createRequire as CreateRequire } from 'module'
import { WorkerClient } from '@virtualpatterns/mablung-worker'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const Require = CreateRequire(import.meta.url)

const LogPath = FilePath.replace('/release/', '/data/').replace('.test.js', '.log')
const LoggedClient = CreateLoggedProcess(WorkerClient, LogPath)
const WorkerPath = Require.resolve('./worker/install.js')
const WorkerMapPath = `${WorkerPath}.map`

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  return FileSystem.remove(LogPath)
})

Test('@virtualpatterns/mablung-source-map-support/install', async (test) => {

  let client = new LoggedClient(WorkerPath)

  await client.whenReady()

  try {

    let error = await client.worker.createError()

    // test.log(error.stack)

    let stack = error.stack.split('\n')
    let [ , item ] = stack

    let pattern = /at Function.createError \((.+):(\d+):(\d+)\)/i
    let [ , path ] = item.match(pattern)

    ;(FileSystem.pathExistsSync(WorkerMapPath) ? test.is : test.is.skip)(path, WorkerPath.replace('release', 'source'))

  } finally {
    await client.exit()
  }

})
