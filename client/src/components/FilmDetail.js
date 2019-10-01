/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FilmSummary from './FilmSummary';

const Detail = styled.div`
  margin: 20px 1em;
  border: 1px solid #dddddd;
  padding: 20px;
  clear: both;
`;

const RightColumn = styled.div`
  float: left;
  width: 60%;
`;

const LeftColumn = styled.div`
  float: left;
  width: 200px;
`;

const Description = styled.p``;

const Clear = styled.div`
  clear: both;
`;

function FilmDetail(props) {
  return (
    <Detail>
      <LeftColumn>
        <img
          alt={props.title}
          src={`http://image.tmdb.org/t/p/w185${props.poster_path}`}
        />
      </LeftColumn>
      <RightColumn>
        <FilmSummary {...props} />
        <hr />
        <Description>{props.overview}</Description>
      </RightColumn>
      <Clear />
    </Detail>
  );
}

// Copy and extend FilmSummary's PropTypes
FilmDetail.propTypes = Object.assign({}, FilmSummary.propTypes, {
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired
});

FilmDetail.defaultProps = Object.assign({}, FilmSummary.defaultProps);

export default FilmDetail;
