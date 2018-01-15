/* jshint esversion: 6 */

const restaurants = [{
  name: 'Indian Mexican',
  cuisine: ['Indian', 'Mexican', 'Japanese']
}, {
  name: 'Babel',
  cuisine: ['Lebanese']
}, {
  name: 'Gorki Park',
  cuisine: ['Russian']
}, {
  name: 'East Moon',
  cuisine: ['Vietnamese']
}, {
  name: 'Kiez Cantine',
  cuisine: ['German']
}, {
  name: 'School Cantine',
  cuisine: ['German']
}, {
  name: 'Flying Monkey',
  cuisine: ['Vietnamese', 'Asiatic']
}];

const people = [{
    name: 'Jeremy',
    favCuisine: ['Lebanese', 'Indian', 'French', 'Japanese'],
    restaurants: [{
      name: 'Indian Mexican',
      score: 3
    }, {
      name: 'Babel',
      score: 3
    }, {
      name: 'School Cantine',
      score: -3
    }],
    lunchThisWeek: [{ name: 'Babel' }]
  }, {
    name: 'Andrey',
    favCuisine: ['Russian'],
    restaurants: [{
      name: 'Gorki Park',
      score: 3
    }, {
      name: 'Kiez Cantine',
      score: 1
    }],
    lunchThisWeek: [{ name: 'Babel' }]
  },
  {
    name: 'Rahul',
    favCuisine: [],
    restaurants: [],
    lunchThisWeek: [{ name: 'Babel' }]
  },
  {
    name: 'Chema',
    favCuisine: ['German'],
    restaurants: [{
      name: 'School Cantine',
      score: 3
    }],
    lunchThisWeek: [{ name: 'School Cantine' }]
  },
  {
    name: 'Piotr',
    favCuisine: [],
    restaurants: [{
      name: 'East Moon',
      score: -3
    }, {
      name: 'Indian Mexican',
      score: 1
    }],
    lunchThisWeek: [{ name: 'Gorki Park' }]
  },
  {
    name: 'Daria',
    favCuisine: ['Russian', 'Lebanese'],
    restaurants: [{
      name: 'Gorki Park',
      score: 3
    }, {
      name: 'Babel',
      score: 3
    }],
    lunchThisWeek: [{ name: 'Gorki Park' }]
  }
];

console.log(randomRestaurantForToday(restaurants, people));
