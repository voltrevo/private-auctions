import sha256 from "../deps/sha256/mod.ts";
import { numberTo32Bits } from "./numberTo32Bits.ts";

type HashFlexInput =
  | number
  | boolean
  | HashFlexInput[];

export class Hash {
  tag = "Hash" as const;

  private constructor(readonly data: boolean[]) {}

  static input(io: Summon.IO, partyName: string, prefix: string): Hash {
    let data: boolean[] = [];

    for (let i = 0; i < 256; i++) {
      data.push(io.input(partyName, `${prefix}[${i}]`, summon.bool()));
    }

    return new Hash(data);
  }

  static calc(...data: HashFlexInput[]) {
    function toBits(data: HashFlexInput): boolean[] {
      switch (typeof data) {
        case 'boolean':
          return [data];
        
        case 'number':
          return numberTo32Bits(data);
        
        default: {
          let res: boolean[] = [];

          for (const item of data) {
            res.push(...toBits(data))
          }

          return res;
        }
      }
    }

    return new Hash(sha256((toBits(data))));
  }

  static eq(a: Hash, b: Hash) {
    for (let i = 0; i < 256; i++) {
      if (a.data[i] !== b.data[i]) {
        return false;
      }
    }

    return true;
  }
}
