import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setTopRatedMovies } from '../features/movie/movieSlice';
import { Link } from 'react-router-dom'; 

const TopRated = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((state) => state.movie.topRatedMovies);
  const searchResults = useSelector((state) => state.movie.searchResults); 

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12; 

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`);
      dispatch(setTopRatedMovies(response.data.results));
      console.log(response, "top rated movies")
    };
    fetchTopRatedMovies();
  }, [dispatch, currentPage]);

  const moviesToDisplay = searchResults.length > 0 ? searchResults : topRatedMovies;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = moviesToDisplay.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(moviesToDisplay.length / moviesPerPage);

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Top Rated Movies</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {currentMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="rounded" 
            />
            <h2 className="mt-2 font-bold">{movie.title}</h2>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-l-md"
        >
          Previous
        </button>
        <span className="bg-gray-800 text-white px-4 py-2">{currentPage}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopRated;
