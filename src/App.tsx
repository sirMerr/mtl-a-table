import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllBrunchRestaurants } from './api';
import brunchRestaurants from './data/brunch-restaurants.json';

const App: React.FC = () => {
  // useEffect(() => {
  //   async function fetchRestaurants() {
  //     const restaurants = await getAllBrunchRestaurants();

  //     console.log(restaurants)
  //   }
  //   fetchRestaurants();
  // }, []);

  console.log(brunchRestaurants);

  return (
    <div className="App">
      <ul>
        {brunchRestaurants.map(restaurant => {
          return (
            <li>
              <a href={`https://mtlatable.mtl.org/en/${restaurant.url}`}>{restaurant.title}</a>
            </li>
          );
        })}
        </ul>
    </div>
  );
}

export default App;
