import fs from 'fs';
import * as summon from 'summon-ts';
import * as mpcf from 'mpc-framework';
import getProjectRoot from '../../src/util/getProjectRoot';
import { strict as assert } from 'assert';
import once from '../../src/util/once';
import { EmpWasmEngine } from 'emp-wasm-engine';
import { runParty } from '../helpers/runParty';
import { hexInput } from '../../src/util/hexInput';
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

  const testCases = [
    {
      name: '5 v 10 => party1 wins',
      party0Input: {
        // random
        ...hexInput('party0Salt', '0x71bed60cc3badcab1ebc65f9aa871e48'),
        party0Bid: 5,
        party0TieBreaker: false,
        // generated using calcInputHash(party1Salt, party1Bid)
        ...hexInput(
          'party1Hash',
          '0x822328711ee4a7aa18deacbb956e41b686f60a6e80203f4276acf42a8cb5a079',
        ),
      },
      party1Input: {
        // random
        ...hexInput('party1Salt', '0xef17f40a21a00de660c05f9dd3571462'),
        party1Bid: 10,
        party1TieBreaker: false,
        // generated using calcInputHash(party0Salt, party0Bid)
        ...hexInput(
          'party0Hash',
          '0x93e66c4772c21414af9059b95887576b1cadb241c6ad6710ce9667316981e102',
        ),
      },
      output: {
        party0HashCheck: true,
        party1HashCheck: true,
        hashesOkAndParty1Wins: true,
      },
    },
  ];

  for (const { name, party0Input, party1Input, output } of testCases) {
    it(name, async function() {
      this.timeout(60_000);

      const { circuit } = compileCircuit();
      const protocol = new mpcf.Protocol(circuit, new EmpWasmEngine());
      const aqs = new AsyncQueueStore<Uint8Array>();

      const results = await Promise.all([
        runParty(protocol, 'party0', party0Input, aqs),
        runParty(protocol, 'party1', party1Input, aqs),
      ]);

      assert.deepStrictEqual(results, [output, output]);
    });
  }
});
