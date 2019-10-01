import React, { useState, useEffect } from 'react';
import { List } from 'immutable';

// import filmData from './films.json';
import FilmTableContainer from './components/FilmTableContainer';
import SearchBar from './components/SearchBar';

function FilmExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('title');
  const [films, setFilms] = useState(List());

  // load the film data
  useEffect(() => {
    const fetchData = () => {
      fetch('/api/films/')
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then(data => {
          setFilms(List(data));
        })
        .catch(err => console.log(err)); // eslint-disable-line no-console
    };
    fetchData();
  }, []);

  // change the rating of a film
  const setRating = (filmid, rating) => {
    const oldFilm = films.find(film => film.id === filmid);
    const newFilm = { ...oldFilm, rating: rating };

    fetch(`/api/films/${filmid}`, {
      method: 'PUT',
      body: JSON.stringify(newFilm),
      headers: new Headers({ 'Content-type': 'application/json' })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then(updatedFilm => {
        const alteredFilms = films.map(film => {
          if (film.id === updatedFilm.id) {
            return updatedFilm;
          }
          return film;
        });
        setFilms(alteredFilms);
      })
      .catch(err => console.log(err)); // eslint-disable-line no-console
  };

  const mainContents =
    films.size === 0 ? (
      <h2>Loading...</h2>
    ) : (
      <FilmTableContainer
        searchTerm={searchTerm}
        films={films}
        sortType={sortType}
        setRatingFor={setRating}
      />
    );

  return (
    <div className="FilmExplorer">
      <SearchBar
        searchTerm={searchTerm}
        setTerm={setSearchTerm}
        sortType={sortType}
        setType={setSortType}
      />
      {mainContents}
    </div>
  );
}

export default FilmExplorer;
