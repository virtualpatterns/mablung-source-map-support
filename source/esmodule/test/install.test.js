import { CreateLoggedProcess } from '@virtualpatterns/mablung-worker/test'
import { WorkerClient } from '@virtualpatterns/mablung-worker'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const LogPath = FilePath.replace('/release/', '/data/').replace('.test.js', '.log')
const LoggedClient = CreateLoggedProcess(WorkerClient, LogPath)
const WorkerPath = Path.resolve(FolderPath, 'worker/install.js')
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
    
    test.is(path, URL.pathToFileURL(WorkerPath.replace('/release/', '/source/')).href)

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
