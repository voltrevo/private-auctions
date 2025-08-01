import { Calculator } from '../util/calculator.js';
import { getProjectRoot } from '../util/getProjectRoot.js';

const calculator = new Calculator();
const projectRoot = getProjectRoot();

console.log('Welcome to Private Auction TypeScript Project!');
console.log('Project root:', projectRoot);
console.log('Calculator example:');
console.log('2 + 3 =', calculator.add(2, 3));
console.log('5 - 2 =', calculator.subtract(5, 2));
console.log('4 * 6 =', calculator.multiply(4, 6));
console.log('8 / 2 =', calculator.divide(8, 2));
