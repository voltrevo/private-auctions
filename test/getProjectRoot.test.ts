import { describe, it } from 'mocha';
import { strict as assert } from 'assert';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { getProjectRoot } from '../src/util/getProjectRoot.js';

describe('getProjectRoot', () => {
  it('should return the project root directory', () => {
    const projectRoot = getProjectRoot();
    
    // Verify the returned path exists
    assert.ok(existsSync(projectRoot), 'Project root should exist');
    
    // Verify package.json exists in the returned directory
    const packageJsonPath = resolve(projectRoot, 'package.json');
    assert.ok(existsSync(packageJsonPath), 'package.json should exist in project root');
    
    // Verify it's a string and not empty
    assert.ok(typeof projectRoot === 'string', 'Project root should be a string');
    assert.ok(projectRoot.length > 0, 'Project root should not be empty');
  });

  it('should return an absolute path', () => {
    const projectRoot = getProjectRoot();
    
    // On Unix-like systems, absolute paths start with '/'
    // On Windows, absolute paths start with a drive letter
    const isAbsolute = projectRoot.startsWith('/') || /^[A-Za-z]:/.test(projectRoot);
    assert.ok(isAbsolute, 'Project root should be an absolute path');
  });

  it('should contain expected project files', () => {
    const projectRoot = getProjectRoot();
    
    // Check for key project files
    const expectedFiles = ['package.json', 'tsconfig.json', 'src', 'test'];
    
    for (const file of expectedFiles) {
      const filePath = resolve(projectRoot, file);
      assert.ok(existsSync(filePath), `Expected file/directory ${file} should exist in project root`);
    }
  });
});
