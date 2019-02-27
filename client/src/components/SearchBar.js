import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const SearchBarContainer=styled.div`
  width: 100%;
  height: 100px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 50px;
  color: white;
  background: rgb(100,100,100);
`;

const SearchBarContents=styled.div`
  width: 300px;
`;

const SearchSelect=styled.select`
  font-size: 12px;
`;

const Title=styled.h1`
  color: white;
  font-family: Impact, Charcoal, sans-serif;
  margin: 10px 0px;
`;

function SearchBar(props) {
  const searchField = (
    <input
      type="text"
      placeholder="Search"
      value={props.searchTerm}
      onChange={event => {
        props.setTerm(event.target.value);
      }}
    />
  );

  const sortTool = (
    <SearchSelect
      value={props.sortType}
      onChange={event => {
        props.setType(event.target.value);
      }}
    >
      <option value="title">Title</option>
      <option value="release_date">Date</option>
      <option value="vote_average">TMDB Rating</option>
    </SearchSelect>
  );

  return (
    <SearchBarContainer>
      <Title>Film Explorer</Title>
      <SearchBarContents>
      {searchField} 
      <p>order by {sortTool}</p>
      </SearchBarContents>
    </SearchBarContainer>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
  setTerm: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired
};

export default SearchBar;
