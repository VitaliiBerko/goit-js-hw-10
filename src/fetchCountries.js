

// const BASE_URL = 'https://restcountries.com/v3.1/name/peru';



function fetchCountries(name) {
  return  fetch(`https://restcountries.com/v3.1/name/${name}`).then(r=>{
        return r.json()
    })
};

fetchCountries('niger');


export {fetchCountries};