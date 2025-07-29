import { strict as assert } from 'assert';
import { calcInputHash } from '../src/util/calcInputHash';

describe('calcInputHash', () => {
  it('should calculate SHA256 hash of salt + bid correctly', () => {
    const saltHex = '0x71bed60cc3badcab1ebc65f9aa871e48';
    const bid = 5;
    const expectedHash = '0x93e66c4772c21414af9059b95887576b1cadb241c6ad6710ce9667316981e102';

    const result = calcInputHash(saltHex, bid);

    assert.strictEqual(result, expectedHash);
  });

  it('should work with salt hex without 0x prefix', () => {
    const saltHex = '71bed60cc3badcab1ebc65f9aa871e48';
    const bid = 5;
    const expectedHash = '0x93e66c4772c21414af9059b95887576b1cadb241c6ad6710ce9667316981e102';

    const result = calcInputHash(saltHex, bid);

    assert.strictEqual(result, expectedHash);
  });

  it('should calculate hash for different bid values', () => {
    const saltHex = '0xef17f40a21a00de660c05f9dd3571462';
    const bid = 10;
    
    const result = calcInputHash(saltHex, bid);
    
    // This should match the hash calculated in the original test
    assert.strictEqual(typeof result, 'string');
    assert.strictEqual(result.startsWith('0x'), true);
    assert.strictEqual(result.length, 66); // 0x + 64 hex characters
  });

  it('should produce consistent results for the same inputs', () => {
    const saltHex = '0x71bed60cc3badcab1ebc65f9aa871e48';
    const bid = 5;

    const result1 = calcInputHash(saltHex, bid);
    const result2 = calcInputHash(saltHex, bid);

    assert.strictEqual(result1, result2);
  });
});
