import { weatherInfo, getWeatherInfo } from "./weather-info.js";

const weatherPage = document.querySelector("#weather")
const page = document.querySelector("body")

export function renderData(weather, city) {
    weatherPage.innerHTML = ""

    const info = weatherInfo[weather.weatherCode]
    console.log(info.background)
    page.className = `weather ${info.background}` 
    if (!weather.isDay) {
    page.classList.add("night")
    weatherPage.classList.add("card-night")
    } else {
        page.classList.remove("night")
    weatherPage.classList.remove("card-night")
    }

    const card = document.createElement("div")
    card.classList.add("card")

    //search different city button
    const searchButton = document.createElement("a")
    searchButton.textContent = "Search different city"
    searchButton.classList.add("search-button")
    card.appendChild(searchButton)

    searchButton.addEventListener("click", () => {
        document.querySelector("#search-form").classList.toggle("hidden")
    })
   
    //name of city
    const cityName = document.createElement("h2")
    cityName.textContent = city.charAt(0).toUpperCase() + city.slice(1)
    card.appendChild(cityName)

    //current weather code icon
    const icon = getWeatherInfo(weather.weatherCode, weather.isDay) 

    const weatherIcon = document.createElement("div")
    weatherIcon.innerHTML = `${icon}`
    card.appendChild(weatherIcon)

    //current weather code description
    const weatherDescription = document.createElement("p")
    weatherDescription.classList.add("text-small")
    weatherDescription.textContent = weatherInfo[weather.weatherCode].description
    card.appendChild(weatherDescription)
  
    //current temperature
    const temperature = document.createElement("div")

    const realTemperature = document.createElement("p")
    realTemperature.classList.add("text-bold")
    realTemperature.textContent = `${weather.temperature}°C`
    const apparentTemperature = document.createElement("p")
    apparentTemperature.classList.add("text-small")
    apparentTemperature.textContent = `Feels like ${weather.apparentTemperature}°C`
    temperature.appendChild(realTemperature)
    temperature.appendChild(apparentTemperature)
    card.appendChild(temperature)

    //current wind
    const wind = document.createElement("div")
    wind.classList.add("container-wind")
    wind.innerHTML = `<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> 
    <p>${weather.wind} km/h</p>`
    card.appendChild(wind)

    //hourly weather
    const heading = document.createElement("h3")
    heading.textContent = "Hourly forecast"
    card.appendChild(heading)
    const hourlyWeather = document.createElement("div")
    hourlyWeather.classList.add("hourly-container")
    card.appendChild(hourlyWeather)

 
    weather.hourly.forEach(hour => {
       const hourlyText = document.createElement("p")
       hourlyText.classList.add("hourly-text")
        hourlyText.textContent = `${hour.time} ${hour.temperature}°C`
        hourlyWeather.appendChild(hourlyText)
    });

    //daily weather
    const dailyHeading = document.createElement("h3")
    dailyHeading.textContent = "Daily forecast"
    card.appendChild(dailyHeading)
    
    const dailyWeather = document.createElement("div")
    dailyWeather.classList.add("daily-container")
    card.appendChild(dailyWeather)
    
    weather.daily.forEach(day => {
        const line = document.createElement("div")
        line.classList.add("line")
        
        const lineDay = document.createElement("p")
        lineDay.textContent = `Den: ${day.time}`
        line.appendChild(lineDay)

         const lineTempMax = document.createElement("p")
          lineTempMax.textContent = `↑ ${day.temperatureMax} °C`
          line.appendChild(lineTempMax)

          const lineTempMin = document.createElement("p")
           lineTempMin.textContent = `↓ ${day.temperatureMin} °C`
           line.appendChild(lineTempMin)

           const lineWeatherCode = document.createElement("div")
            const iconSm = getWeatherInfo(day.weatherCode, 235)
            lineWeatherCode.innerHTML = `${iconSm}`
            line.appendChild(lineWeatherCode)

            dailyWeather.appendChild(line)
    })
   


    //sunrise and sunset
    const sunTime = document.createElement("div")
    sunTime.classList.add("container-wind")
    sunTime.innerHTML = `
    <div class="suntime-box">
    <h3>Sunrise</h3>
    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10V3M12 3L9 6M12 3L15 6M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <p class="suntime-text">${weather.sunrise}</p>
    </div>
    <div class="suntime-box">
    <h3>Sunset</h3>
    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18M12 3V10M12 10L15 7M12 10L9 7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <p class="suntime-text">${weather.sunset}</p> 
    </div>`
    card.appendChild(sunTime)

    weatherPage.appendChild(card)

    if (weather.isDay === 0) {
        document.querySelector("#main-heading").style.color = "#fff"
    } else {
        
        document.querySelector("#main-heading").style.color = "#003d5f"
    }
}
