export function numberTo32Bits(x: number): boolean[] {
  let res: boolean[] = [];

  for (let i = 0; i < 32; i++) {
    res.push(((x >> i) & 1) === 1);
  }

  return res;
}
