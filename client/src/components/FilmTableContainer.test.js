import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import FilmTableContainer from './FilmTableContainer';

const films = List([
  {
    id: 135397,
    overview: 'case word substring',
    release_date: '2015-10-02',
    poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
    title: 'The Title',
    vote_average: 6.9
  },
  {
    id: 286217,
    overview: 'Case',
    release_date: '2014-06-12',
    poster_path: '/AjbENYG3b8lhYSkdrWwlhVLRPKR.jpg',
    title: 'Word',
    vote_average: 7.7
  }
]);

describe('FilmTableContainer', () => {
  let comp;
  beforeEach(() => {
    comp = shallow(
      <FilmTableContainer
        films={films}
        searchTerm=""
        sortType="title"
        setRatingFor={jest.fn}
      />
    );
  });

  describe('Filters film by case keyword', () => {
    test('Empty string does not filter films', () => {
      expect(comp.find('FilmTable').prop('films').size).toBe(2);
    });

    test('Any substring satisfies the filter', () => {
      comp.setProps({ searchTerm: 'sub' });
      expect(comp.find('FilmTable').prop('films').size).toBe(1);
    });

    test('Keyword is case insensitive', () => {
      comp.setProps({ searchTerm: 'Case' });
      expect(comp.find('FilmTable').prop('films').size).toBe(2);
    });

    test('Title and overview are tested', () => {
      comp.setProps({ searchTerm: 'word' });
      expect(comp.find('FilmTable').prop('films').size).toBe(2);
    });
  });

  describe('Sorts films by property', () => {
    test('Sorts by title', () => {
      comp.setProps({ sortType: 'title' });
      expect(comp.find('FilmTable')).toHaveProp('films', films);
    });

    test('Sorts by year of release_date', () => {
      comp.setProps({ sortType: 'release_date' });
      expect(comp.find('FilmTable')).toHaveProp(
        'films',
        List([films.get(1), films.get(0)])
      );
    });
  });
});
