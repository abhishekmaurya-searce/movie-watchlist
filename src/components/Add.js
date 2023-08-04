import React, { useState } from "react";
import { ResultCard } from "./ResultCard";

export const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const moviesPerPage = 10;

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
    setCurrentPage(1);

    fetchMovies(e.target.value, 1);
  };

  const fetchMovies = (query, page) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=9907597e8c87bcd90224ac71ce578167&language=en-US&page=${page}&include_adult=false&query=${query}`
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
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchMovies(query, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchMovies(query, currentPage + 1);
    }
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>

          {results.length > 0 && (
            <>
              <ul className="results">
                {results
                  .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
                  .map((movie) => (
                    <li key={movie.id}>
                      <ResultCard movie={movie} />
                    </li>
                  ))}
              </ul>
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
