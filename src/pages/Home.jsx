import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPopularMovies } from '../features/movie/movieSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movie.popularMovies);
  const searchResults = useSelector((state) => state.movie.searchResults);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const moviesPerPage = 12;

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`
        );

        // Set popular movies and total pages from the API response
        dispatch(setPopularMovies(response.data.results));
        setTotalPages(response.data.total_pages);
        console.log(`Fetched page ${currentPage}`, response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchPopularMovies();
  }, [dispatch, currentPage]);

  const moviesToDisplay = searchResults.length > 0 ? searchResults : popularMovies;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {moviesToDisplay.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}> 
            <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-700">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-2">
                <h2 className="mt-2 text-sm font-semibold text-white truncate">{movie.title}</h2>
                <p className="text-xs text-gray-400">Rating: {movie.vote_average}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isNearStart = pageNumber <= 3;
          const isNearEnd = pageNumber === totalPages;
          const isCurrentPage = currentPage === pageNumber;
          const isInMiddleRange = pageNumber === currentPage - 1 || pageNumber === currentPage + 1;

          if (isNearStart || isNearEnd || isInMiddleRange || isCurrentPage) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`mx-1 px-4 py-2 rounded-md ${isCurrentPage ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
              >
                {pageNumber}
              </button>
            );
          }

          if (
            (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) &&
            !isNearStart &&
            !isNearEnd
          ) {
            return (
              <span key={pageNumber} className="mx-1 px-2 py-2 text-gray-400">
                ...
              </span>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Home;
