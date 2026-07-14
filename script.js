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


async function getCoordinates(city) {
   const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)

   const data = await response.json()
 
   const latitude = data.results[0].latitude
   const longitude = data.results[0].longitude

   return {latitude, longitude}
}

async function getWeather(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,rain,uv_index,wind_speed_10m&current=temperature_2m,rain,cloud_cover,wind_speed_10m,apparent_temperature&timezone=auto`)

    const data = await response.json()
    console.log(data)

    return {
        temperature: data.current.temperature_2m,
        apparentTemperature: data.current.apparent_temperature,
        sunrise: data.daily.sunrise[0].split("T")[1],
        sunset: data.daily.sunset[0].split("T")[1],
        rain: data.current.rain,
        cloudCover: data.current.cloud_cover,
        wind: data.current.wind_speed_10m
    }
}

function renderData(weather, city) {
    console.log(weather)
   const card = document.createElement("p")

   card.innerHTML = 
   `City: ${city}<br> 
    Temperature: ${weather.temperature}°C <br>
    Apparent temperature: ${weather.apparentTemperature} °C <br>
    Rain: ${weather.rain} <br>
    Wind: ${weather.wind}m/s <br>
    Sunrise: ${weather.sunrise} <br> 
    Sunset: ${weather.sunset}`

    weatherPage.appendChild(card)
}
