export function hexToBits(hex: string): boolean[] {
  // Validate input - check if it's a valid hex string
  if (!hex || typeof hex !== 'string') {
    throw new Error('Input must be a non-empty string');
  }

  // Remove '0x' prefix if present
  const cleanHex = hex.toLowerCase().replace(/^0x/, '');

  // Check if string contains only valid hex characters
  if (!/^[0-9a-f]+$/.test(cleanHex)) {
    throw new Error('Input must be a valid hexadecimal string');
  }

  // Check if we have an even number of nibbles (representing complete bytes)
  if (cleanHex.length % 2 !== 0) {
    throw new Error('Input must have an even number of hex digits (complete bytes)');
  }

  // Convert each byte (2 hex digits) to bits with LSB first
  const bits: boolean[] = [];
  for (let i = 0; i < cleanHex.length; i += 2) {
    const byteHex = cleanHex.substring(i, i + 2);
    const byteValue = parseInt(byteHex, 16);
    
    // Convert byte to 8 bits with least significant bit first
    for (let bit = 0; bit < 8; bit++) {
      bits.push((byteValue & (1 << bit)) !== 0);
    }
  }

  return bits;
}
