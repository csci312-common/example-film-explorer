import React, { useState } from 'react';

import FilmSummary from './FilmSummary';
import MovieDetail from './FilmDetail';

function FilmContainer(props) {
  const [showDetail, setShowDetail] = useState(false);
  const View = showDetail ? MovieDetail : FilmSummary;
  return (
    <View
      {...props}
      onClick={() => {
        setShowDetail(!showDetail);
      }}
    />
  );
}

export default FilmContainer;
