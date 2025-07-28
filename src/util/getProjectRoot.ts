import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

/**
 * Gets the root directory of the project by looking for package.json
 * Works both when running with tsx (from src/) and compiled JavaScript (from dist/)
 */
export function getProjectRoot(): string {
  // Get the directory of the current module
  const currentFileUrl = import.meta.url;
  const currentFilePath = fileURLToPath(currentFileUrl);
  const currentDir = dirname(currentFilePath);
  
  // Start from current directory and traverse up until we find package.json
  let searchDir = currentDir;
  
  while (searchDir !== dirname(searchDir)) { // Continue until we reach filesystem root
    const packageJsonPath = resolve(searchDir, 'package.json');
    
    if (existsSync(packageJsonPath)) {
      return searchDir;
    }
    
    // Move up one directory
    searchDir = dirname(searchDir);
  }
  
  // If we couldn't find package.json, throw an error
  throw new Error('Could not find project root (package.json not found)');
}

export default getProjectRoot;
