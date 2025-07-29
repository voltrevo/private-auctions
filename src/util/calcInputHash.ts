import { createHash } from 'crypto';

/**
 * Calculate SHA256 hash of salt + bid
 * @param saltHex - The salt as a hex string (with or without 0x prefix)
 * @param bid - The bid value as a number
 * @returns The SHA256 hash as a hex string with 0x prefix
 */
export function calcInputHash(saltHex: string, bid: number): string {
  // Convert hex string to bytes (remove 0x prefix if present)
  const saltBytes = Buffer.from(saltHex.replace(/^0x/, ''), 'hex');
  
  // Convert bid to 32-bit little endian bytes
  const bidBytes = Buffer.allocUnsafe(4);
  bidBytes.writeUInt32LE(bid, 0);
  
  // Concatenate salt + bid
  const combined = Buffer.concat([saltBytes, bidBytes]);
  
  // Calculate SHA256
  const hash = createHash('sha256').update(combined).digest('hex');
  
  return '0x' + hash;
}
