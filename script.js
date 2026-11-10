import { getCoordinates, getWeather } from "./api.js";
import { renderData } from "./card.js";

const searchForm = document.querySelector("#city-search")

searchForm.addEventListener("submit", async event => {
    event.preventDefault()

    const city = event.target.elements.city.value
    console.log(city)

    event.target.elements.city.value = ""
   
    const coordinates = await getCoordinates(city)

    console.log(coordinates)

   if (coordinates === 0) {
    alert("Please enter a valid city")
    return
    }
  
    const weather = await getWeather(coordinates.latitude, coordinates.longitude)

    renderData(weather, city)

    document.querySelector("#search-form").classList.add("hidden")

})