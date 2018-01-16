/* jshint esversion: 6 */

// flatten :: [array] -> [a]
function flatten(list) {
  return list.reduce((prev, cur) => prev.concat(cur), []);
}

// restaurantToRemoveForPeople :: [People] -> [string]
function restaurantToRemoveForPeople(listOfPeople) {
  return listOfPeople.map(cur => {
    const restaurants = cur.restaurants.filter(cur => cur.score === -3);
    return restaurants.map(cur => cur.id);
  });
}

// uniqueStrings:: [string] -> [string]
function uniqueStrings(listOfStrings) {
  return listOfStrings.filter((cur, index, array) => array.indexOf(cur) === index);
}

// notInList :: ([a], [a]) -> [a]
function notInList(listOfExclusion, listToExcludeFrom) {
  return listToExcludeFrom.filter(cur => listOfExclusion.indexOf(cur.id) === -1);
}

// inList :: ([a], [a]) -> [a]
function inList(listOfInclusion, listToExcludeFrom) {
  return listToExcludeFrom.filter(cur => listOfInclusion.indexOf(cur.id) >= 0);
}

// getId :: [object] -> [string]
function getId(list) {
  return list.map(cur => cur.id);
}

// sortByScore :: [object] -> [object]
function sortByScore(listOfRestaurants) {
  return listOfRestaurants.sort((a, b) => a.score - b.score);
}

// getName :: ([object], number) -> string
function getName(listOfRestaurants, restaurantId) {
  const restaurant = listOfRestaurants.find(cur => cur.id === restaurantId);

  if (restaurant === undefined) {
    return undefined;
  } else {
    return restaurant.name;
  }
}

// getTotalScore :: ([Restaurant], [People]) -> [object]
function getTotalScore(listOfRestaurants, listOfPeople) {
  const selectedRestaurants = flatten(listOfPeople.map(cur => inList(getId(listOfRestaurants), cur.restaurants)));

  return selectedRestaurants.reduce((prev, cur) => {
    const curAlreadyThere = prev.find(prevEl => prevEl.id === cur.id);

    if (curAlreadyThere === undefined) {
      prev.push(cur);

      return prev;

    } else {
      const prevWithoutCur = prev.filter(cur1 => cur1.id !== cur.id);

      curAlreadyThere.score += cur.score;
      prevWithoutCur.push(curAlreadyThere);

      return prevWithoutCur;

    }
  }, []);
}

// randomRestaurantForToday :: ([Restaurant], [People]) -> Restaurant
function randomRestaurantForToday(listOfRestaurants, listOfPeopleToEatTogether) {
  const restaurantsVisitedThisWeekPerPeople = listOfPeopleToEatTogether.map(cur => getId(cur.lunchThisWeek));
  const restaurantsVisitedThisWeekFlatten = flatten(restaurantsVisitedThisWeekPerPeople);
  const uniqueRestaurantVisitedThisWeek = uniqueStrings(restaurantsVisitedThisWeekFlatten);

  const restaurantsWhereNoOneWentThisWeek = notInList(uniqueRestaurantVisitedThisWeek, listOfRestaurants);

  const restaurantsWhereSomeDoNoWantToEat = restaurantToRemoveForPeople(listOfPeopleToEatTogether);
  const restaurantsWhereSomeDoNoWantToEatFlatten = flatten(restaurantsWhereSomeDoNoWantToEat);

  const restaurantsWhereEveryOneCanEat = notInList(restaurantsWhereSomeDoNoWantToEatFlatten, restaurantsWhereNoOneWentThisWeek);

  const winningRestaurant = restaurantsWhereEveryOneCanEat[Math.floor(Math.random() * restaurantsWhereEveryOneCanEat.length)];

  /*
  const scorePerRestaurant = getTotalScore(restaurantsWhereEveryOneCanEat, listOfPeopleToEatTogether);
  const listOfRestaurantsSorted = sortByScore(scorePerRestaurant);

  const winningRestaurant = listOfRestaurantsSorted.pop();
  */

  return getName(listOfRestaurants, winningRestaurant.id);
}
