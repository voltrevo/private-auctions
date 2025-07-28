# Private Auction TypeScript Project

A TypeScript project with Mocha testing and tsx for development, focused on private auctions powered by MPC (Multi-Party Computation).

## Features

- **TypeScript**: Full TypeScript support with strict type checking
- **tsx**: Fast TypeScript execution without compilation during development
- **Mocha**: Comprehensive testing framework with TypeScript support
- **ES Modules**: Modern JavaScript module system
- **Build System**: TypeScript compilation to JavaScript

## Project Structure

```
private-auction/
├── src/                    # Source TypeScript files
│   ├── index.ts           # Main entry point
│   └── calculator.ts      # Example Calculator class
├── test/                  # Test files
│   └── calculator.test.ts # Mocha tests for Calculator
├── dist/                  # Compiled JavaScript output
├── package.json           # Project configuration
├── tsconfig.json          # TypeScript configuration
├── .mocharc.json          # Mocha configuration
└── .gitignore             # Git ignore rules
```

## Scripts

- `npm run dev` - Run TypeScript files directly with tsx (development)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript
- `npm test` - Run Mocha tests with TypeScript support
- `npm run test:watch` - Run tests in watch mode
- `npm run clean` - Remove build artifacts

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run in development mode**:
   ```bash
   npm run dev
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Technologies Used

- **TypeScript 5.5+**: Static type checking and modern JavaScript features
- **tsx 4.16+**: TypeScript execution engine for Node.js
- **Mocha 10.7+**: Test framework
- **Node.js**: JavaScript runtime

## Development

### Adding New Features

1. Create TypeScript files in the `src/` directory
2. Add corresponding test files in the `test/` directory
3. Use `npm run dev` to test your changes quickly
4. Run `npm test` to ensure all tests pass

### Testing

The project uses Mocha for testing with TypeScript support via tsx. Test files should:
- Be placed in the `test/` directory
- Follow the naming pattern `*.test.ts`
- Import test functions from `mocha`
- Use Node.js `assert` module for assertions

Example test structure:
```typescript
import { describe, it } from 'mocha';
import { strict as assert } from 'assert';
import { YourClass } from '../src/your-file.js';

describe('YourClass', () => {
  it('should do something', () => {
    // Your test code here
    assert.equal(actual, expected);
  });
});
```

## License

MIT
