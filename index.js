/* jshint esversion: 6 */

/* JSON schema
listOfRestaurant = {
  "type": "array",
  "minItems": 1,
  "items": {
    "title": "Restaurant",
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "cuisine": {
        "type": "array",
        "minItems": 1,
        "items": {
          "type": "string"
        }
      }
    }
  },
  "uniqueItems": true
}
*/

/*
listOfPeopleToEatTogether = {
  "type": "array",
  "minItems": 1,
  "items": {
    "title": "People",
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "favCuisine": {
        "type": "array",
        "minItems": 1,
        "items": {
          "type": "string"
        }
      },
      "restaurants": {
        "type": "array",
        "minItems": 1,
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
            },
            "score": {
              "type": "number",
              "min": -3,
              "max": 3
              "description": "Steps from -3 -1 0 1 3"
            }
          }
        },
        "uniqueItems": true
      },
      "lunchThisWeek": {
        "type": "array",
        "minItems": 1,
        "items": {
          "type": "string"
        },
        "uniqueItems": true
      }
    }
  },
  "uniqueItems": true
}
*/

// flatten :: [array] -> [a]
function flatten(list) {
  return list.reduce((prev, cur) => prev.concat(cur), []);
}

// restaurantToRemoveForPeople :: [People] -> [string]
function restaurantToRemoveForPeople(listOfPeople) {
  return listOfPeople.map(cur => {
    const restaurants = cur.restaurants.filter(cur => cur.score === -3);
    return restaurants.map(cur => cur.name);
  });
}

// uniqueStrings:: [string] -> [string]
function uniqueStrings(listOfStrings) {
  return listOfStrings.filter((cur, index, array) => array.indexOf(cur) === index);
}

// notInList :: ([a], [a]) -> [a]
function notInList(listOfExclusion, listToExcludeFrom) {
  return listToExcludeFrom.filter(cur => listOfExclusion.indexOf(cur.name) === -1);
}

// inList :: ([a], [a]) -> [a]
function inList(listOfInclusion, listToExcludeFrom) {
  return listToExcludeFrom.filter(cur => listOfInclusion.indexOf(cur.name) >= 0);
}

// getName :: [object] -> [string]
function getName(list) {
  return list.map(cur => cur.name);
}

function sortByScore(listOfRestaurants) {
  return listOfRestaurants.sort((a, b) => a.score - b.score);
}

// getTotalScore :: ([Restaurant], [People]) -> [object]
function getTotalScore(listOfRestaurants, listOfPeople) {
  const selectedRestaurants = flatten(listOfPeople.map(cur => inList(getName(listOfRestaurants), cur.restaurants)));

  return selectedRestaurants.reduce((prev, cur) => {
    const curAlreadyThere = prev.find(prevEl => prevEl.name === cur.name);

    if (curAlreadyThere === undefined) {
      prev.push(cur);

      return prev;

    } else {
      const prevWithoutCur = prev.filter(cur1 => cur1.name !== cur.name);

      curAlreadyThere.score += cur.score;
      prevWithoutCur.push(curAlreadyThere);

      return prevWithoutCur;

    }
  }, []);
}

// randomRestaurantForToday :: ([Restaurant], [People]) -> Restaurant
function randomRestaurantForToday(listOfRestaurants, listOfPeopleToEatTogether) {
  const restaurantsVisitedThisWeekPerPeople = listOfPeopleToEatTogether.map(cur => getName(cur.lunchThisWeek));
  const restaurantsVisitedThisWeekFlatten = flatten(restaurantsVisitedThisWeekPerPeople);
  const uniqueRestaurantVisitedThisWeek = uniqueStrings(restaurantsVisitedThisWeekFlatten);

  const restaurantsWhereNoOneWentThisWeek = notInList(uniqueRestaurantVisitedThisWeek, listOfRestaurants);

  const restaurantsWhereSomeDoNoWantToEat = restaurantToRemoveForPeople(listOfPeopleToEatTogether);
  const restaurantsWhereSomeDoNoWantToEatFlatten = flatten(restaurantsWhereSomeDoNoWantToEat);

  const restaurantsWhereEveryOneCanEat = notInList(restaurantsWhereSomeDoNoWantToEatFlatten, restaurantsWhereNoOneWentThisWeek);

  const scorePerRestaurant = getTotalScore(restaurantsWhereEveryOneCanEat, listOfPeopleToEatTogether);
  const listOfRestaurantsSorted = sortByScore(scorePerRestaurant);

  return listOfRestaurantsSorted.pop();
}

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
