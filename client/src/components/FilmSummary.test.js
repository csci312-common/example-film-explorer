import React from 'react';
import { shallow } from 'enzyme';

import FilmSummary from './FilmSummary';

const film = {
  id: 135397,
  overview: 'Twenty-two years after the events of Jurassic Park...',
  release_date: '2015-06-12',
  poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
  title: 'Jurassic World',
  vote_average: 6.9
};

describe('FilmSummary', () => {
  test('FilmSummary snapshot', () => {
    const comp = shallow(
      <FilmSummary {...film} onClick={jest.fn} setRatingFor={jest.fn} />
    );
    expect(comp).toMatchSnapshot();
  });
});
