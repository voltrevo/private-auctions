import fs from 'fs';
import * as summon from 'summon-ts';
import getProjectRoot from '../../src/util/getProjectRoot';
import { strict as assert } from 'assert';

describe('compare2Bids', () => {
  it('compiles', async () => {
    await summon.init();

    const { circuit: _circuit, diagnostics } = summon.compile({
      path: `${getProjectRoot()}/src/circuits/compare2Bids.ts`,
      boolifyWidth: 32,
      readFile: (filePath) => fs.readFileSync(filePath, 'utf-8'),
    });

    for (const [path, diag] of Object.entries(diagnostics)) {
      assert.equal(diag.length, 0, `${path}: ${JSON.stringify(diag, null, 2)}`);
    }
  });
});
