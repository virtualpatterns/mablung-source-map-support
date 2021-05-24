"use strict";

var _depcheck = _interopRequireDefault(require("depcheck"));

var _is = _interopRequireDefault(require("@pwn/is"));

var _ava = _interopRequireDefault(require("ava"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Process = process;
(0, _ava.default)('depcheck', async test => {
  let unused = await (0, _depcheck.default)(Process.cwd(), {
    'ignorePatterns': ['/coverage', '/process']
  }); // test.log(unused)

  test.deepEqual(unused.dependencies, []);
  test.deepEqual(unused.devDependencies, ['@babel/cli', '@babel/preset-env', '@virtualpatterns/mablung-makefile', 'c8', 'npm-check-updates', 'shx']);
  test.true(_is.default.emptyObject(unused.missing));
  test.true(_is.default.emptyObject(unused.invalidDirs));
  test.true(_is.default.emptyObject(unused.invalidFiles));
});

//# sourceMappingURL=depcheck.test.cjs.map