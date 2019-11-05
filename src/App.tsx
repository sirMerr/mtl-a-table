import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllBrunchRestaurants } from './api';
import brunchRestaurants from './data/brunch-restaurants.json';

// Right now, just brunch restaurants
const App: React.FC = () => {
  // useEffect(() => {
  //   async function fetchRestaurants() {
  //     const restaurants = await getAllBrunchRestaurants();

  //     console.log(restaurants)
  //   }
  //   fetchRestaurants();
  // }, []);

  // console.log(brunchRestaurants);

  return (
    <div className="App">
      <ul>
        {brunchRestaurants.map(restaurant => {
          return (
            <li key={restaurant.data_nid}>
              <a href={`https://mtlatable.mtl.org/en/${restaurant.url}`}>{restaurant.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
