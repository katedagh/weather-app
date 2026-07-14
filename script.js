const searchForm = document.querySelector("#city-search")

searchForm.addEventListener("submit", async event => {
    event.preventDefault()

    const city = event.target.elements.city.value
    console.log(city)

    event.target.elements.city.value = ""
   
    const coordinates = await getCoordinates(city)
  
    getWeather(coordinates.latitude, coordinates.longitude)
})


async function getCoordinates(city) {
   const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)

   const data = await response.json()
 
   const latitude = data.results[0].latitude
   const longitude = data.results[0].longitude
   
   return { latitude, longitude}
}



async function getWeather(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`)

    const data = await response.json()
    console.log(data) 
}
