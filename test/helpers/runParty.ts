import { Protocol } from "mpc-framework";
import { AsyncQueueStore } from "mpc-framework-common";

export async function runParty(
  protocol: Protocol,
  party: string,
  input: Record<string, unknown>,
  aqs: AsyncQueueStore<Uint8Array>,
) {
  const session = protocol.join(
    party,
    input,
    (to, msg) => {
      aqs.get(`${party}-${to}`).push(msg);
    },
  );

  const partyNames = protocol.circuit.mpcSettings.map(
    ({ name }, i) => name ?? `party${i}`,
  );

  for (const otherParty of partyNames) {
    if (otherParty !== party) {
      aqs.get(`${otherParty}-${party}`).stream(
        data => session.handleMessage(otherParty, data),
      );
    }
  }

  const output = await session.output();

  return output;
}
