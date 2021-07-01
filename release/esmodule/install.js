import URL from 'url';

import { SourceMapSupport } from './index.js';

SourceMapSupport.install({
  'handleUncaughtExceptions': false,
  'retrieveSourceMap': function (source) {

    if (/^file:/.test(source)) {
      return SourceMapSupport.retrieveSourceMap(URL.fileURLToPath(source));
    } else {
      return null;
    }

  } });
