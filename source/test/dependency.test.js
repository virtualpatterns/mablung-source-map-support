import Check from 'depcheck'
import Test from 'ava'

const Process = process

Test('dependency', async (test) => {

  let unused = await Check(Process.cwd(), {
    'ignoreMatches': [
      '@babel/preset-env',
      '@virtualpatterns/babel-config-mablung-makefile',
      '@virtualpatterns/mablung-makefile'
    ],
    'parsers': {
      '**/*.cjs': [Check.parser.es6, Check.parser.es7.default],
      '**/*.js': [Check.parser.es6, Check.parser.es7.default]
    }
  })

  test.deepEqual(unused.dependencies, [])
  test.deepEqual(unused.devDependencies, [])

  test.deepEqual(unused.missing, {})

  test.deepEqual(unused.invalidDirs, {})
  test.deepEqual(unused.invalidFiles, {})

})
