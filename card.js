import { getWeatherIcon } from "./icons.js";

const weatherPage = document.querySelector("#weather")


export function renderData(weather, city) {
    weatherPage.innerHTML = ""
    const card = document.createElement("div")
    card.classList.add("card")
   
   const cityName = document.createElement("h2")
   cityName.textContent = city.charAt(0).toUpperCase() + city.slice(1)
   card.appendChild(cityName)

const icon = getWeatherIcon(weather.weatherCode) 

const weatherIcon = document.createElement("div")
weatherIcon.innerHTML = `${icon}`
card.appendChild(weatherIcon)
  
   const temperature = document.createElement("p")
   temperature.classList.add("text-bold")
  temperature.textContent = `${weather.temperature}°C`
  card.appendChild(temperature)

  const sunTime = document.createElement("div")
  sunTime.classList.add("suntime")
  sunTime.innerHTML = `
  <div class="suntime-box">
    <h3>Sunrise</h3>
    <p class="suntime-text">${weather.sunrise}</p>
    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10V3M12 3L9 6M12 3L15 6M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
 
 <div class="suntime-box">
    <h3>Sunset</h3>
    <p class="suntime-text">${weather.sunset}</p> 
    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18M12 3V10M12 10L15 7M12 10L9 7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
 </div>
  `
  card.appendChild(sunTime)

weatherPage.appendChild(card)
}
