import { describe, it } from 'mocha';
import { strict as assert } from 'assert';
import { Calculator } from '../src/util/calculator.js';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      const result = calculator.add(2, 3);
      assert.equal(result, 5);
    });

    it('should add negative numbers correctly', () => {
      const result = calculator.add(-2, -3);
      assert.equal(result, -5);
    });

    it('should add zero correctly', () => {
      const result = calculator.add(5, 0);
      assert.equal(result, 5);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers correctly', () => {
      const result = calculator.subtract(5, 3);
      assert.equal(result, 2);
    });

    it('should handle negative results', () => {
      const result = calculator.subtract(3, 5);
      assert.equal(result, -2);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      const result = calculator.multiply(4, 6);
      assert.equal(result, 24);
    });

    it('should handle multiplication by zero', () => {
      const result = calculator.multiply(5, 0);
      assert.equal(result, 0);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers correctly', () => {
      const result = calculator.divide(8, 2);
      assert.equal(result, 4);
    });

    it('should throw error when dividing by zero', () => {
      assert.throws(() => {
        calculator.divide(5, 0);
      }, Error, 'Division by zero is not allowed');
    });

    it('should handle decimal results', () => {
      const result = calculator.divide(7, 2);
      assert.equal(result, 3.5);
    });
  });
});
