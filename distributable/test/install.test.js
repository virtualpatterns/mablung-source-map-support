import _URL from "url";import Path from 'path';
import Test from 'ava';

Test('Error(string)', test => {

  let error = new Error('error');

  let errorStack = error.stack.split('\n');
  let [, stackItem] = errorStack;

  let pattern = /at (.+):(\d+):(\d+)/i;
  let [, errorPath, errorLineNumber, errorColumnNumber] = stackItem.match(pattern);

  test.log(`'${Path.relative('', errorPath)}' on line ${errorLineNumber}, column ${errorColumnNumber}`);

  let filePath = _URL.fileURLToPath(import.meta.url);
  filePath = filePath.replace(/distributable/i, 'source');

  test.is(errorPath, filePath);

});
//# sourceMappingURL=install.test.js.map