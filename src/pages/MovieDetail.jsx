import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setMovieDetails, setMovieCast } from '../features/movie/movieSlice';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const movieDetails = useSelector((state) => state.movie.movieDetails);
  const movieCast = useSelector((state) => state.movie.movieCast);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const detailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
      dispatch(setMovieDetails(detailsResponse.data));

      const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
      dispatch(setMovieCast(castResponse.data.cast));
      console.log("cast", castResponse);
    };

    fetchMovieDetails();
  }, [movieId, dispatch]);

  return (
    <div className="mt-4 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
    
      <div className="flex flex-col lg:flex-row items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-6"
          style={{ maxWidth: '300px', height: 'auto' }}
        />
        <div>

          <h1 className="text-4xl font-bold">{movieDetails.title}</h1>
          <p className="text-gray-400 mt-1">Release Date: {new Date(movieDetails.release_date).toLocaleDateString()}</p>
          <p className="text-gray-400">Rating: {movieDetails.vote_average} / 10</p>
          <p className="mt-2">{movieDetails.overview}</p>

     
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Details:</h2>
            <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
            <p>
              <strong>Genres:</strong> {movieDetails.genres?.map((genre) => genre.name).join(', ')}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl mt-6 font-semibold">Cast:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
        {movieCast.map((cast) => (
          <div key={cast.id} className="bg-gray-800 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <div className="flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
                className="rounded-lg w-32 h-32 object-cover mb-2 shadow-md"
              />
              <p className="font-medium text-center">{cast.name}</p>
              <p className="text-sm text-gray-400 text-center">{cast.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
