import FileSystem from 'fs-extra';
import Path from 'path';
import _Test from 'ava';
import URL from 'url';

const FilePath = URL.fileURLToPath(import.meta.url);
const FileMapPath = `${FilePath}.map`;

const Test = FileSystem.pathExistsSync(FileMapPath) ? _Test : _Test.failing;

Test('Error(string)', async (test) => {

  let error = new Error('error');

  let errorStack = error.stack.split('\n');
  let [, stackItem] = errorStack;

  let pattern = /at (.+):(\d+):(\d+)/i;
  let [, errorPath /* , errorLineNumber, errorColumnNumber */] = stackItem.match(pattern);

  if (Test === _Test.failing) {
    test.log(`The source map '${Path.relative('', FilePath)}.map' does not exist!`);
  }

  test.is(errorPath, FilePath.replace(/release/i, 'source'));

});

//# sourceMappingURL=install.test.js.map