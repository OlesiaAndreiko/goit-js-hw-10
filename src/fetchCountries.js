import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import notFound from './index'

const BASE_URL = 'https://restcountries.com/v3.1/name/'
const filtres ='name,capital,population,flags,languages'

function notFound() {
    Notify.failure("Oops, there is no country with that name!")
}

export default function fetchCountries(name) {
   return fetch(`${BASE_URL}${name}?fields=${filtres}`)
    .then(resp => {
        if(!resp.ok) {
            notFound()
            throw Error(statusText);
        } 
        return resp.json()})
    }
