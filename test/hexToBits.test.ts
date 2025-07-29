import { describe, it } from 'mocha';
import { strict as assert } from 'assert';
import { hexToBits } from '../src/util/hexToBits.js';

describe('hexToBits', () => {
  describe('valid inputs', () => {
    it('should convert byte to 8 bits (LSB first)', () => {
      // 0xA3 = 163 decimal = 10100011 binary
      // LSB first: [1,1,0,0,0,1,0,1]
      const result = hexToBits('A3');
      assert.deepEqual(result, [true, true, false, false, false, true, false, true]);
    });

    it('should handle 0x prefix', () => {
      // 0xFF = 255 decimal = 11111111 binary
      // LSB first: all bits true
      const result = hexToBits('0xFF');
      assert.deepEqual(result, [true, true, true, true, true, true, true, true]);
    });

    it('should handle lowercase hex', () => {
      // 0xff = 255 decimal = 11111111 binary
      // LSB first: all bits true
      const result = hexToBits('ff');
      assert.deepEqual(result, [true, true, true, true, true, true, true, true]);
    });

    it('should handle zero byte', () => {
      // 0x00 = 0 decimal = 00000000 binary
      // LSB first: all bits false
      const result = hexToBits('00');
      assert.deepEqual(result, [false, false, false, false, false, false, false, false]);
    });

    it('should handle mixed case', () => {
      // 0xaB = 171 decimal = 10101011 binary
      // LSB first: [1,1,0,1,0,1,0,1]
      const result = hexToBits('aB');
      assert.deepEqual(result, [true, true, false, true, false, true, false, true]);
    });

    it('should handle multiple bytes', () => {
      // 0x01FF = byte 0x01 followed by byte 0xFF
      // 0x01 = 1 decimal = 00000001 binary -> LSB first: [1,0,0,0,0,0,0,0]
      // 0xFF = 255 decimal = 11111111 binary -> LSB first: [1,1,1,1,1,1,1,1]
      const result = hexToBits('01FF');
      assert.deepEqual(result, [
        true, false, false, false, false, false, false, false,  // 0x01
        true, true, true, true, true, true, true, true           // 0xFF
      ]);
    });
  });

  describe('invalid inputs', () => {
    it('should throw error for empty string', () => {
      assert.throws(() => hexToBits(''), Error, 'Input must be a non-empty string');
    });

    it('should throw error for odd number of hex digits', () => {
      assert.throws(() => hexToBits('A'), Error, 'Input must have an even number of hex digits (complete bytes)');
    });

    it('should throw error for odd number of hex digits with 0x prefix', () => {
      assert.throws(() => hexToBits('0xA'), Error, 'Input must have an even number of hex digits (complete bytes)');
    });

    it('should throw error for invalid hex characters', () => {
      assert.throws(() => hexToBits('GG'), Error, 'Input must be a valid hexadecimal string');
    });

    it('should throw error for mixed invalid characters', () => {
      assert.throws(() => hexToBits('A3Z1'), Error, 'Input must be a valid hexadecimal string');
    });

    it('should throw error for special characters', () => {
      assert.throws(() => hexToBits('A3!0'), Error, 'Input must be a valid hexadecimal string');
    });
  });
});
