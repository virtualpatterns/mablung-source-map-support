import Check from 'depcheck'
import Test from 'ava'

const Process = process

Test('default', async (test) => {

  let unused = await Check(Process.cwd(), {
    'ignoreMatches': [
      '@virtualpatterns/babel-preset-mablung-makefile',
      '@virtualpatterns/mablung-source-map-support'
    ],
    'parsers': {
      '**/*.cjs': [ Check.parser.es7.default ],
      '**/*.js': [ Check.parser.es7.default ]
      // '**/*.cjs': [ Check.parser.es6, Check.parser.es7.default ],
      // '**/*.js': [ Check.parser.es6, Check.parser.es7.default ]
    }
  })

  // test.log(unused.using)

  test.deepEqual(unused.dependencies, [])
  test.deepEqual(unused.devDependencies, [])

  test.deepEqual(unused.missing, {})

  test.deepEqual(unused.invalidDirs, {})
  test.deepEqual(unused.invalidFiles, {})

})
