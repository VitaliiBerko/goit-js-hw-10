import debounce from 'lodash.debounce';
import './css/styles.css';
import * as API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputSearchForm = document.querySelector('#search-box');
const userInfoCountry = document.querySelector('.country-info');
const userListCountrys = document.querySelector('.country-list');

// console.log(API.fetchCountries());

inputSearchForm.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

function onSearchInput(e) {
  const form = e.target;
  const searchQuery = form.value.trim();
  if (!searchQuery) {
    clearContainer();
    return;
  }

  const quantityCountrys = API.fetchCountries(searchQuery).then(data =>console.log(data.length));

  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    )
    .finally(clearContainer());

  // if (quantityCountrys === 1) {
  //   API.fetchCountries(searchQuery)
  //     .then(renderCountryCard)
  //     .catch(() =>
  //       Notiflix.Notify.failure('Oops, there is no country with that name')
  //     );
  // }
  // else if (quantityCountrys <= 10 && quantityCountrys > 1) {
  //   API.fetchCountries(searchQuery)
  //     .then(renderCountrysList)
  //     .catch(() =>
  //       Notiflix.Notify.failure('Oops, there is no country with that name')
  //     );
  // }
  // else {
  //   API.fetchCountries(searchQuery).then(() =>
  //     Notiflix.Notify.info(
  //       'Too many matches found. Please enter a more specific name.'
  //     )
  //   );
  // }
}

function renderCountryCard(coutrys) {
  const markup = coutrys
    .map(({ name, capital, population, flags, languages }) => {
      const valuesLanguages = Object.values(languages);
      return `<ul>
      <img src="${flags.svg}" alt="Flag" width="60">
      
    <h2>${name.official}</h2>
    <li> Capital: ${capital}</li>
    <li>Population: ${population}</li>
    <li>Languages: ${valuesLanguages.join(', ')}</li>
    </ul>`;
    })
    .join('');
  userInfoCountry.insertAdjacentHTML('afterbegin', markup);
}

function renderCountrysList(coutrys) {
  const markup = coutrys
    .map(({ name, flags }) => {
      return `<li>            
    <h3><img src="${flags.svg}" alt="Flag" width="30">  ${name.official}</h3>   
    </li>`;
    })
    .join('');
  userListCountrys.insertAdjacentHTML('afterbegin', markup);
}

function clearContainer() {
  userInfoCountry.innerHTML = '';
  userListCountrys.innerHTML = '';
}
