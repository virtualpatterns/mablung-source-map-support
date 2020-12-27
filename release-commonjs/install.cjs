"use strict";

var _url = _interopRequireDefault(require("url"));

var _index = require("./index.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index.SourceMapSupport.install({
  'handleUncaughtExceptions': false,
  'retrieveSourceMap': function (source) {
    if (/^file:/.test(source)) {
      return _index.SourceMapSupport.retrieveSourceMap(_url.default.fileURLToPath(source));
    } else {
      return null;
    }
  }
});
//# sourceMappingURL=install.cjs.map