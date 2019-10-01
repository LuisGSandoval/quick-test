import React from 'react';
import Header from './Components/Header';
import MovieList from './Components/MovieList';
import ResultsMessage from './Components/ResultsMessage';
import Paginator from './Components/Paginator';

function App() {
  return (
    <div>
      <Header />
      <ResultsMessage />
      <MovieList />
      <Paginator />
    </div>
  );
}

export default App;
