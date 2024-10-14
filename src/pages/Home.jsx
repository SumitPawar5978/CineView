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
  const moviesPerPage = 12;

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`);
      dispatch(setPopularMovies(response.data.results));
    };
    fetchPopularMovies();
  }, [dispatch, currentPage]);

  const moviesToDisplay = searchResults.length > 0 ? searchResults : popularMovies;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = moviesToDisplay.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(moviesToDisplay.length / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {currentMovies.map((movie) => (
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
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
