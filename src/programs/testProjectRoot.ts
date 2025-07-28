import { getProjectRoot } from '../util/getProjectRoot.js';

console.log('Testing getProjectRoot from compiled JavaScript...');
try {
  const projectRoot = getProjectRoot();
  console.log('✅ Success! Project root:', projectRoot);
  console.log('✅ This should end with "private-auction"');
} catch (error) {
  console.error('❌ Error:', error instanceof Error ? error.message : String(error));
  process.exit(1);
}
