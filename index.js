/* jshint esversion: 6 */

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

// sortByScore :: [object] -> [object]
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
