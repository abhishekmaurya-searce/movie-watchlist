import React, { useState, useEffect } from "react";
import { ResultCard } from "./ResultCard";

export const Popular = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const moviesPerPage = 10;

  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage]);

  const fetchPopularMovies = (page) => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=9907597e8c87bcd90224ac71ce578167&language=en-US&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
          setTotalPages(data.total_pages);
        } else {
          setResults([]);
          setTotalPages(0);
        }
      });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    return results.slice(startIndex, endIndex).map((movie) => (
      <li key={movie.id}>
        <ResultCard movie={movie} />
      </li>
    ));
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          {results.length > 0 && (
            <>
              <ul className="results">{renderMovies()}</ul>
              <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>{currentPage}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
