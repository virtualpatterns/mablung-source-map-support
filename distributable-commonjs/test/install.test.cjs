"use strict";

var _path = _interopRequireDefault(require("path"));

var _ava = _interopRequireDefault(require("ava"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import URL from 'url'
(0, _ava.default)('Error(string)', test => {
  let error = new Error('error');
  let errorStack = error.stack.split('\n');
  let [, stackItem] = errorStack;
  let pattern = /at (.+):(\d+):(\d+)/i;
  let [, errorPath, errorLineNumber, errorColumnNumber] = stackItem.match(pattern);
  test.log(`'${_path.default.relative('', errorPath)}' on line ${errorLineNumber}, column ${errorColumnNumber}`);
  let filePath = __filename; // URL.fileURLToPath(import.meta.url)

  filePath = filePath.replace(/distributable-commonjs/i, 'source-commonjs');
  test.is(errorPath, filePath);
});
//# sourceMappingURL=install.test.cjs.map