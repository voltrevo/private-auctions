import { describe, it } from 'mocha';
import { strict as assert } from 'assert';
import { once } from '../src/util/once.js';

describe('once', () => {
  it('should call the function only once', () => {
    let callCount = 0;
    const func = () => {
      callCount++;
      return 'result';
    };

    const onceFn = once(func);

    // First call
    const result1 = onceFn();
    assert.equal(result1, 'result');
    assert.equal(callCount, 1);

    // Second call - should not call the original function again
    const result2 = onceFn();
    assert.equal(result2, 'result');
    assert.equal(callCount, 1);

    // Third call - should still not call the original function
    const result3 = onceFn();
    assert.equal(result3, 'result');
    assert.equal(callCount, 1);
  });

  it('should return the same result for all calls', () => {
    const func = () => Math.random();
    const onceFn = once(func);

    const result1 = onceFn();
    const result2 = onceFn();
    const result3 = onceFn();

    assert.equal(result1, result2);
    assert.equal(result2, result3);
  });

  it('should work with functions that return objects', () => {
    let callCount = 0;
    const func = () => {
      callCount++;
      return { value: 'test', timestamp: Date.now() };
    };

    const onceFn = once(func);

    const result1 = onceFn();
    const result2 = onceFn();

    assert.equal(callCount, 1);
    assert.strictEqual(result1, result2); // Same object reference
    assert.equal(result1.value, 'test');
    assert.equal(result2.value, 'test');
  });

  it('should work with functions that return undefined', () => {
    let callCount = 0;
    const func = () => {
      callCount++;
      return undefined;
    };

    const onceFn = once(func);

    const result1 = onceFn();
    const result2 = onceFn();

    assert.equal(callCount, 1);
    assert.equal(result1, undefined);
    assert.equal(result2, undefined);
  });

  it('should work with functions that return null', () => {
    let callCount = 0;
    const func = () => {
      callCount++;
      return null;
    };

    const onceFn = once(func);

    const result1 = onceFn();
    const result2 = onceFn();

    assert.equal(callCount, 1);
    assert.equal(result1, null);
    assert.equal(result2, null);
  });

  it('should work with functions that throw errors', () => {
    let callCount = 0;
    const func = () => {
      callCount++;
      throw new Error('Test error');
    };

    const onceFn = once(func);

    // First call should throw
    assert.throws(() => onceFn(), Error, 'Test error');
    assert.equal(callCount, 1);

    // Subsequent calls should also throw the same error
    assert.throws(() => onceFn(), Error, 'Test error');
    assert.equal(callCount, 1); // Should not call the original function again
  });
});
