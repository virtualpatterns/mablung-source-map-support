module.exports = function({ path }) {
  
  return {
    'failFast': true,
    'files': [
      'release/**/test/**/*.test.*'
    ],
    'require': [
      './release/esmodule/install.js'
    ],
    'verbose': true
  }

}
