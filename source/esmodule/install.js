// import URL from 'url'

import { SourceMapSupport } from './index.js'

SourceMapSupport.install({ 
  'handleUncaughtExceptions': false //, 
  // 'retrieveSourceMap': function(source) {

  //   if (/^file:/.test(source)) {

  //     // console.log(`from '${source}'`)
  //     // console.log(`  to '${URL.fileURLToPath(source)}'`)

  //     return SourceMapSupport.retrieveSourceMap(URL.fileURLToPath(source))

  //   } else {
  //     return null
  //   }

  // }
})
