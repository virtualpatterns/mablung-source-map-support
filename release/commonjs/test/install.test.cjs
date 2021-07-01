"use strict";

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _ava = _interopRequireDefault(require("ava"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FilePath = __filename;
const FileMapPath = `${FilePath}.map`;
const Test = _fsExtra.default.pathExistsSync(FileMapPath) ? _ava.default : _ava.default.failing;
Test('Error(string)', async test => {
  let error = new Error('error');
  let errorStack = error.stack.split('\n');
  let [, stackItem] = errorStack;
  let pattern = /at (.+):(\d+):(\d+)/i;
  let [, errorPath
  /*, errorLineNumber, errorColumnNumber */
  ] = stackItem.match(pattern);

  if (Test === _ava.default.failing) {
    test.log(`The source map '${_path.default.relative('', FilePath)}.map' does not exist!`);
  }

  test.is(errorPath, FilePath.replace(/release/i, 'source'));
});
