export default (io: Summon.IO) => {
  const party0Bid = io.input('party0', 'party0Bid', summon.number());
  const party0TieBreaker = io.input('party0', 'party0TieBreaker', summon.bool());

  const party1Bid = io.input('party1', 'party1Bid', summon.number());
  const party1TieBreaker = io.input('party1', 'party1TieBreaker', summon.bool());

  const tieBreaker = party0TieBreaker !== party1TieBreaker;

  const [bidA, bidB] = tieBreaker
    ? [party0Bid, party1Bid]
    : [party1Bid, party0Bid];

  const lessThan = bidA < bidB;

  const party1Wins = tieBreaker
    ? lessThan   // party0Bid < party1Bid     ==>   party1Bid >  party0Bid
    : !lessThan; // !(party1Bid < party0Bid)  ==>   party1Bid >= party0Bid

  io.outputPublic('party1Wins', party1Wins);
};
