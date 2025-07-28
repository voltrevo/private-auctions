import fs from 'fs';
import * as summon from 'summon-ts';
import * as mpcf from 'mpc-framework';
import getProjectRoot from '../../src/util/getProjectRoot';
import { strict as assert } from 'assert';
import once from '../../src/util/once';
import { EmpWasmEngine } from 'emp-wasm-engine';
import { runParty } from '../helpers/runParty';
import { AsyncQueueStore } from 'mpc-framework-common';

const compileCircuit = once(() => summon.compile({
  path: `${getProjectRoot()}/src/circuits/compare2Bids.ts`,
  boolifyWidth: 32,
  readFile: (filePath) => fs.readFileSync(filePath, 'utf-8'),
}));

describe('compare2Bids', () => {
  it('compiles', async () => {
    await summon.init();

    const { diagnostics } = compileCircuit();

    for (const [path, diag] of Object.entries(diagnostics)) {
      assert.equal(diag.length, 0, `${path}: ${JSON.stringify(diag, null, 2)}`);
    }
  });

  it('5 < 10', async () => {
    const { circuit } = compileCircuit();

    const protocol = new mpcf.Protocol(circuit, new EmpWasmEngine());

    const aqs = new AsyncQueueStore<Uint8Array>();

    const party0Input = { party0Bid: 5, party0TieBreaker: false };
    const party1Input = { party1Bid: 10, party1TieBreaker: false };

    const results = await Promise.all([
      runParty(protocol, 'party0', party0Input, aqs),
      runParty(protocol, 'party1', party1Input, aqs),
    ]);

    assert.deepStrictEqual(results, [
      { party1Wins: true },
      { party1Wins: true },
    ]);
  });
});
