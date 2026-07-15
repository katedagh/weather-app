import { getCoordinates, getWeather } from "./api.js";
import { renderData } from "./card.js";

const searchForm = document.querySelector("#city-search")

const weatherPage = document.querySelector("#weather")

searchForm.addEventListener("submit", async event => {
    event.preventDefault()

    const city = event.target.elements.city.value
    console.log(city)

    event.target.elements.city.value = ""
   
    const coordinates = await getCoordinates(city)
  
    const weather = await getWeather(coordinates.latitude, coordinates.longitude)

    renderData(weather, city)
})
