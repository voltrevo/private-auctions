export function compare2Bids(
  party0Bid: number,
  party0TieBreaker: boolean,
  party1Bid: number,
  party1TieBreaker: boolean,
): boolean {
  const tieBreaker = party0TieBreaker !== party1TieBreaker;

  const [bidA, bidB] = tieBreaker
    ? [party0Bid, party1Bid]
    : [party1Bid, party0Bid];

  const lessThan = bidA < bidB;

  const party1Wins = tieBreaker
    ? lessThan   // party0Bid < party1Bid     ==>   party1Bid >  party0Bid
    : !lessThan; // !(party1Bid < party0Bid)  ==>   party1Bid >= party0Bid
  
  return party1Wins;
}
