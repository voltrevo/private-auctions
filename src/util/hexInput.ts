import { hexToBits } from "./hexToBits";

export function hexInput(prefix: string, hex: string) {
  let input: Record<string, boolean> = {};

  for (const [i, bit] of hexToBits(hex).entries()) {
    input[`${prefix}[${i}]`] = bit;
  }

  return input;
}
