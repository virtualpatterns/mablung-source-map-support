import Test from 'ava'

Test.before(async (test) => {
  test.context.index = await import('../index.cjs')
})

;[
  'SourceMapSupport'
].forEach((name) => {

  Test(name, (test) => {
    test.truthy(test.context.index[name])
  })
  
})
