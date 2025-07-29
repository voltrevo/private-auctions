// Note: Must be compiled with boolifyWidth:32.

import { compare2Bids } from "./util/compare2Bids.ts";
import { Hash } from "./util/Hash.ts";
import { Salt } from "./util/Salt.ts";

export default (io: Summon.IO) => {
  const party0Salt = Salt.input(io, 'party0', 'party0Salt');
  const party0Bid = io.input('party0', 'party0Bid', summon.number());
  const party0TieBreaker = io.input('party0', 'party0TieBreaker', summon.bool());

  const party1Salt = Salt.input(io, 'party1', 'party1Salt');
  const party1Bid = io.input('party1', 'party1Bid', summon.number());
  const party1TieBreaker = io.input('party1', 'party1TieBreaker', summon.bool());

  // Each hash comes from the OTHER party
  // This could be done via inputPublic instead, but doing it this way means
  // clients only need to build the circuit once and can re-use it many times.
  const party0Hash = Hash.input(io, 'party1', 'party0Hash');
  const party1Hash = Hash.input(io, 'party0', 'party1Hash');

  const party0HashCalc = Hash.calc([party0Salt.data, party0Bid]);
  const party1HashCalc = Hash.calc([party1Salt.data, party1Bid]);

  const party0HashCheck = Hash.eq(party0HashCalc, party0Hash);
  const party1HashCheck = Hash.eq(party1HashCalc, party1Hash);

  io.outputPublic('party0HashCheck', party0HashCheck);
  io.outputPublic('party1HashCheck', party1HashCheck);

  const hashesOk = party0HashCheck && party1HashCheck;

  const party1Wins = compare2Bids(
    party0Bid,
    party0TieBreaker,
    party1Bid,
    party1TieBreaker,
  );

  io.outputPublic('hashesOkAndParty1Wins', hashesOk && party1Wins);
};
