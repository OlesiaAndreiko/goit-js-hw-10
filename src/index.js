import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countriesCard = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
    const countryName = e.target.value.trim(); 
    
    if(!countryName) {
        return
    }

    fetchCountries(countryName)
    .then(data => {
        if (data.length > 10) {
            manyCountriesFound(data)
        } else if (data.length <= 10 & data.length > 1) {
            createCountryList(data)
        } else if (data.length = 1) {  
            createCountryCard(data)
        }
    })
    .catch(err => console.error(err));    

    if(!e.textContent) {
        cleanerList();
        cleanerCard(); 
    }
}

function manyCountriesFound() {
    Notify.info('Too many matches found. Please enter a more specific name.');
}

function createCountryList(arr) {
    const markup = arr.map(({ flags , name }) => {        
    return `<div class="country-caption content"><img class="" src="${flags.svg}" alt="${name.official}" width="45px">
            <p class="country-name">${name.official}</p></div>`}).join('');
    countriesList.innerHTML = markup;
}

function createCountryCard(arr) {
    const markup = arr.map(({ name, capital, population, flags, languages }) => {        
    return`<div class="country-caption"><img class="" src="${flags.svg}" alt="${name.official}" width="50px">        
        <h1>${name.official}</h1></div>
        <ul>
        <li class="prop-item"><h2>Capital:</h2><p class="country-name">${capital}</p></li>
        <li class="prop-item"><h2>Population:</h2><p class="country-name">${population}</p></li>
        <li class="prop-item"><h2>Languages:</h2><p class="country-name">${Object.values(languages).join(', ')}</p></li>
        </ul>`}).join('');     
    countriesCard.innerHTML = markup;  
}

function cleanerList() {
    countriesList.innerHTML = "";
}

function cleanerCard() {
    countriesCard.innerHTML = "";
}
