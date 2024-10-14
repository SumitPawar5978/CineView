import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../features/movie/movieSlice';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}`);
        dispatch(setSearchResults(response.data.results));
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      dispatch(setSearchResults([])); 
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Cine View</h1>

        <div className="md:hidden flex-1 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Movies..."
            className="p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button onClick={toggleDrawer} className="text-white md:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {drawerOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden" onClick={toggleDrawer}>
            <div className="absolute right-0 bg-gray-900 text-white w-64 p-4">
              <button onClick={toggleDrawer} className="text-white absolute top-2 right-2">✖</button>
              <Link to="/" className="block py-2" onClick={toggleDrawer}>Home</Link>
              <Link to="/top-rated" className="block py-2" onClick={toggleDrawer}>Top Rated</Link>
              <Link to="/upcoming" className="block py-2" onClick={toggleDrawer}>Upcoming</Link>
            </div>
          </div>
        )}

        <div className="hidden md:flex md:flex-row flex-1 justify-end">
          <Link to="/" className="text-white mx-2 py-2">Home</Link>
          <Link to="/top-rated" className="text-white mx-2 py-2">Top Rated</Link>
          <Link to="/upcoming" className="text-white mx-2 py-2">Upcoming</Link>
        </div>

        <div className="hidden md:flex md:ml-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Movies..."
            className="p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
