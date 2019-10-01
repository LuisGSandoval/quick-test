import React from 'react';
import Header from './Components/Header';
import MovieList from './Components/MovieList';
import ResultsMessage from './Components/ResultsMessage';

function App() {
  return (
    <div>
      <Header />
      <ResultsMessage />
      <MovieList />
    </div>
  );
}

export default App;
