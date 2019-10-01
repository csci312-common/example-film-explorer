import React from 'react';
import { shallow, mount } from 'enzyme';

import FilmContainer from './FilmContainer';
import FilmSummary from './FilmSummary';
import FilmDetail from './FilmDetail';

const film = {
  id: 135397,
  overview: 'Twenty-two years after the events of Jurassic Park...',
  release_date: '2015-06-12',
  poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
  title: 'Jurassic World',
  vote_average: 6.9
};

describe('FilmContainer', () => {
  test('Initially renders summary view', () => {
    const comp = shallow(<FilmContainer {...film} setRatingFor={jest.fn} />);
    expect(comp).toContainMatchingElement(FilmSummary);
    expect(comp).not.toContainMatchingElement(FilmDetail);
  });

  // Given the FilmContainer is rendered
  // And FilmContaner's state.detail is false
  // When I click on the FilmTitle component
  // Then I expect the FilmDetail component to exist
  // And I expect the element 'img[src="http://the/poster"]' to exist
  // When I click on the FilmTitle component
  // Then I expect the FilmDetail component to not exist
  test('Clicking on title toggles detail view', () => {
    // Use mount so that children will be rendered and we can interact with
    // the DOM
    const comp = mount(<FilmContainer {...film} setRatingFor={jest.fn} />);
    expect(comp.find(FilmDetail).exists()).toBe(false);
    expect(comp).not.toContainMatchingElement(FilmDetail);

    // styled-compnents don't have their displayName set, so we do so manually
    // to enable find('FilmTitle');
    comp.find('FilmTitle').simulate('click');
    expect(comp).toContainMatchingElement(FilmDetail);
    expect(comp).toContainExactlyOneMatchingElement(
      'img[src="http://image.tmdb.org/t/p/w185/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg"]'
    );

    comp.find('FilmTitle').simulate('click');
    expect(comp).not.toContainMatchingElement(FilmDetail);
  });
});
