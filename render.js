// render :: (string, string) -> Node
function render(domId, content) {
  const el = document.getElementById(domId).innerHTML = content;
  return el;
}

function renderPeopleToEatWith(domId, listOfPeople) {
  const formId = 'people-to-select';
  const selectName = 'select-people';
  const peopleInOption = listOfPeople.map(cur => `<option value="${cur.id}">${cur.name}</option>`);
  const select = `<form id="${formId}">
                    <div>
                      <select name="${selectName}" multiple="true" size="5">
                        ${peopleInOption}
                      </select>
                    </div>
                    <button type="submit">Tell me where we can eat together</button>
                  </form>`;

  render(domId, select);
  const el = document.getElementById(formId);

  el.addEventListener('submit', getRestaurant(selectName, listOfPeople), false);
}

function getRestaurant(select, listOfPeople) {
  return function(event) {
    event.preventDefault();
    const valuesForSelect = event.target.elements[select].selectedOptions;
    let list = []

    for (var i = 0; i < valuesForSelect.length; i++) {
      list.push(Number(valuesForSelect[i].value));
    }

    if (list.length > 0) {
      const bestRestaurant = randomRestaurantForToday(restaurants, inList(list, listOfPeople));
      return renderBestRestaurant('result-for-best-restaurant', bestRestaurant);
    }
  }
}

function renderBestRestaurant(domId, restaurant) {
  const content = `<p>You should eat at <b>${restaurant}</b> today !</p>`;

  return render(domId, content);
}


renderPeopleToEatWith('people-selection', [jeremy, andrey, rahul, chema, piotr, daria]);
