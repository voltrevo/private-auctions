export class Salt {
  tag = "Salt" as const;

  private constructor(readonly data: boolean[]) {}

  static input(io: Summon.IO, partyName: string, prefix: string): Salt {
    let data: boolean[] = [];

    for (let i = 0; i < 128; i++) {
      data.push(io.input(partyName, `${prefix}[${i}]`, summon.bool()));
    }

    return new Salt(data);
  }
}
