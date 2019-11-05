import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllBrunchRestaurants } from './api';
import brunchRestaurants from './data/brunch-restaurants.json';
import RestaurantCard from './components/card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

// Right now, just brunch restaurants
const App: React.FC = () => {
  const classes = useStyles();

  // useEffect(() => {
  //   async function fetchRestaurants() {
  //     const restaurants = await getAllBrunchRestaurants();

  //     console.log(restaurants)
  //   }
  //   fetchRestaurants();
  // }, []);

  // console.log(brunchRestaurants);

  return (
    <Container>
      <Typography variant="h1" component="h2" gutterBottom>
        MTL a Table Brunch Restaurants
      </Typography>
      <Grid container className={classes.root} spacing={2}>
        {brunchRestaurants.map(restaurant => {
          return (
            <Grid item xs={12} sm={3} key={restaurant.data_nid}>
              <RestaurantCard
                image={restaurant.background_image_url}
                title={restaurant.title}
                description={restaurant.summary || ""}
                link={`https://mtlatable.mtl.org${restaurant.url}`}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
