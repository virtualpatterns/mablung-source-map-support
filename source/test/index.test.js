import Test from 'ava'

Test('OK', async (test) => {
  test.true((await import('../index.js')).OK)
})
