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
  path: `${getProjectRoot()}/src/circuits/compare2BidsFull.ts`,
  boolifyWidth: 32,
  readFile: (filePath) => fs.readFileSync(filePath, 'utf-8'),
}));

describe('compare2BidsFull', () => {
  it('compiles', async () => {
    await summon.init();

    const { diagnostics } = compileCircuit();

    for (const [path, diag] of Object.entries(diagnostics)) {
      assert.equal(diag.length, 0, `${path}: ${JSON.stringify(diag, null, 2)}`);
    }
  });

  // const testCases = [
  //   {
  //     name: '5 v 10 => party1 wins',
  //     party0Input: { party0Bid: 5, party0TieBreaker: false },
  //     party1Input: { party1Bid: 10, party1TieBreaker: false },
  //     output: { party1Wins: true },
  //   },
  //   {
  //     name: '3 v 1 => party1 loses',
  //     party0Input: { party0Bid: 3, party0TieBreaker: false },
  //     party1Input: { party1Bid: 1, party1TieBreaker: false },
  //     output: { party1Wins: false },
  //   },
  //   {
  //     name: 'equal and no tiebreakers => party1 wins',
  //     party0Input: { party0Bid: 17, party0TieBreaker: false },
  //     party1Input: { party1Bid: 17, party1TieBreaker: false },
  //     output: { party1Wins: true },
  //   },
  //   {
  //     name: 'equal and both tiebreakers => party1 wins',
  //     party0Input: { party0Bid: 17, party0TieBreaker: false },
  //     party1Input: { party1Bid: 17, party1TieBreaker: false },
  //     output: { party1Wins: true },
  //   },
  //   {
  //     name: 'equal and one tiebreaker => party1 loses',
  //     party0Input: { party0Bid: 17, party0TieBreaker: true },
  //     party1Input: { party1Bid: 17, party1TieBreaker: false },
  //     output: { party1Wins: false },
  //   },
  //   {
  //     name: 'equal and one tiebreaker (2) => party1 loses',
  //     party0Input: { party0Bid: 17, party0TieBreaker: false },
  //     party1Input: { party1Bid: 17, party1TieBreaker: true },
  //     output: { party1Wins: false },
  //   },
  // ];

  // for (const { name, party0Input, party1Input, output } of testCases) {
  //   it(name, async () => {
  //     const { circuit } = compileCircuit();
  //     const protocol = new mpcf.Protocol(circuit, new EmpWasmEngine());
  //     const aqs = new AsyncQueueStore<Uint8Array>();

  //     const results = await Promise.all([
  //       runParty(protocol, 'party0', party0Input, aqs),
  //       runParty(protocol, 'party1', party1Input, aqs),
  //     ]);

  //     assert.deepStrictEqual(results, [output, output]);
  //   });
  // }
});
