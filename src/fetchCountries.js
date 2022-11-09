

// const BASE_URL = 'https://restcountries.com/v3.1/name/peru';



function fetchCountries(name) {
  return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(r=>{
        return r.json()
    })
};




export {fetchCountries};