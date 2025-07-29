import { compare2Bids } from "./util/compare2Bids.ts";

export default (io: Summon.IO) => {
  const party0Bid = io.input('party0', 'party0Bid', summon.number());
  const party0TieBreaker = io.input('party0', 'party0TieBreaker', summon.bool());

  const party1Bid = io.input('party1', 'party1Bid', summon.number());
  const party1TieBreaker = io.input('party1', 'party1TieBreaker', summon.bool());

  io.outputPublic('party1Wins', compare2Bids(
    party0Bid,
    party0TieBreaker,
    party1Bid,
    party1TieBreaker,
  ));
};
