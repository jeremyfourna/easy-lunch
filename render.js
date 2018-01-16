/* jshint esversion: 6 */

// render :: (string, string) -> Node
function render(domId, content) {
  const dom = document.getElementById(domId);
  dom.innerHTML = content;

  return dom;
}

function renderPeopleToEatWith(domId, listOfPeople) {
  const formId = 'people-to-select';
  const selectName = 'select-people';
  const peopleInOption = listOfPeople.map(cur => `<option value="${cur.id}">${cur.name}</option>`).join('');
  const form = `<form id="${formId}">
                  <div>
                    <select id="${selectName}" multiple="true" size="5">
                      ${peopleInOption}
                    </select>
                  </div>
                  <button type="submit">Tell me where we can eat together</button>
                </form>`;

  render(domId, form);
  const el = document.getElementById(formId);

  el.addEventListener('submit', getRestaurant(formId, selectName, listOfPeople), false);
}

function getRestaurant(formId, selectId, listOfPeople) {
  return function(event) {
    event.preventDefault();

    const valuesForSelect = document.forms.namedItem(formId)[selectId].selectedOptions;
    let list = [];

    for (var i = 0; i < valuesForSelect.length; i++) {
      const val = Number(valuesForSelect[i].value);
      list.push(val);
    }

    if (list.length > 0) {
      const bestRestaurant = randomRestaurantForToday(restaurants, inList(list, listOfPeople));

      return renderBestRestaurant('result-for-best-restaurant', bestRestaurant);
    }
  };
}

function renderBestRestaurant(domId, restaurant) {
  const content = `<p>You should eat at <b>${restaurant}</b> today !</p>`;

  return render(domId, content);
}


renderPeopleToEatWith('people-selection', [jeremy, andrey, rahul, chema, piotr, daria]);
