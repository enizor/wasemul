/* eslint-disable */
import { findFeaturedGames } from '../src/controllers/game';

jest.mock('../src/db/dbInit');

// Test of the ranking feature
it('should rank games', async () => {
  let featured;
  const ranks = [];
  const res = {
    send: value => {
      featured = value;
    },
  };
  await findFeaturedGames(null, res);
  featured.forEach(elt => {
    ranks.push(elt.name);
  });
  expect(ranks).toEqual(['b', 'a', 'c']);
});
