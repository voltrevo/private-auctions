import { Calculator } from './util/calculator.js';
import { getProjectRoot } from './util/getProjectRoot.js';
import { once } from './util/once.js';

const calculator = new Calculator();
const projectRoot = getProjectRoot();

// Example of using the once utility
const expensiveOperation = once(() => {
  console.log('🔄 Performing expensive calculation...');
  // Simulate expensive operation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
});

console.log('Welcome to Private Auction TypeScript Project!');
console.log('Project root:', projectRoot);
console.log('Calculator example:');
console.log('2 + 3 =', calculator.add(2, 3));
console.log('5 - 2 =', calculator.subtract(5, 2));
console.log('4 * 6 =', calculator.multiply(4, 6));
console.log('8 / 2 =', calculator.divide(8, 2));

console.log('\n🧪 Testing once() utility:');
console.log('First call to expensive operation:');
const result1 = expensiveOperation();
console.log('Result:', result1.toFixed(2));

console.log('Second call to expensive operation (should be cached):');
const result2 = expensiveOperation();
console.log('Result:', result2.toFixed(2));

console.log('Both results are identical:', result1 === result2);
