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
