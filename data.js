/* jshint esversion: 6 */

const restaurants = [{
  name: 'W Imbiss',
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
}, {
  name: 'Chay Viet',
  cuisine: ['Vietnamese']
}, {
  name: 'Oder Burger',
  cuisine: ['Burger']
}];

const jeremy = {
  name: 'Jeremy',
  favCuisine: ['Lebanese', 'Indian', 'French', 'Japanese'],
  restaurants: [{
    name: 'W Imbiss',
    score: 3
  }, {
    name: 'Babel',
    score: 3
  }, {
    name: 'School Cantine',
    score: -3
  }],
  lunchThisWeek: []
};

const andrey = {
  name: 'Andrey',
  favCuisine: ['Russian'],
  restaurants: [{
    name: 'Gorki Park',
    score: 3
  }, {
    name: 'Chay Viet',
    score: 1
  }, {
    name: 'W Imbiss',
    score: 1
  }, {
    name: 'Babel',
    score: -1
  }, {
    name: 'School Cantine',
    score: -3
  }],
  lunchThisWeek: []
};

const rahul = {
  name: 'Rahul',
  favCuisine: [],
  restaurants: [{
    name: 'Gorki Park',
    score: 1
  }, {
    name: 'Oder Burger',
    score: 1
  }, {
    name: 'Chay Viet',
    score: 1
  }, {
    name: 'School Cantine',
    score: -3
  }, {
    name: 'East Moon',
    score: -1
  }, {
    name: 'W Imbiss',
    score: 1
  }],
  lunchThisWeek: []
};

const chema = {
  name: 'Chema',
  favCuisine: ['German'],
  restaurants: [{
    name: 'School Cantine',
    score: 3
  }],
  lunchThisWeek: []
};

const piotr = {
  name: 'Piotr',
  favCuisine: [],
  restaurants: [{
    name: 'East Moon',
    score: -3
  }, {
    name: 'W Imbiss',
    score: 1
  }],
  lunchThisWeek: []
};

const daria = {
  name: 'Daria',
  favCuisine: ['Russian', 'Lebanese'],
  restaurants: [{
    name: 'Gorki Park',
    score: 3
  }, {
    name: 'Babel',
    score: 3
  }],
  lunchThisWeek: []
};

const people = [jeremy, andrey, rahul];

console.log(randomRestaurantForToday(restaurants, people));
