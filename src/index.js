import debounce from 'lodash.debounce';
import './css/styles.css';
import * as API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputSearchForm = document.querySelector('#search-box');

console.log(API.fetchCountries());
console.log(inputSearchForm);

inputSearchForm.addEventListener('input', debounce(onSearchInput, 300));

function onSearchInput(e) {
  const form = e.target;
  const searchQuery = form.value;

  console.log(e.target.value);

  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    )
    // .finally(() => {form.reset()});
}

function renderCountryCard(coutry) {}
