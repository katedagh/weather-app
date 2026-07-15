async function getCoordinates(city) {
   const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)

   const data = await response.json()
 
   const latitude = data.results[0].latitude
   const longitude = data.results[0].longitude

   return {latitude, longitude}
}

async function getWeather(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,rain,uv_index,wind_speed_10m&current=temperature_2m,rain,wind_speed_10m,apparent_temperature,weather_code,showers,is_day&timezone=auto`)

    const data = await response.json()
    console.log(data.current.weather_code)

    return {
        temperature: data.current.temperature_2m,
        apparentTemperature: data.current.apparent_temperature,
        sunrise: data.daily.sunrise[0].split("T")[1],
        sunset: data.daily.sunset[0].split("T")[1],
        rain: data.current.rain,
        weatherCode: data.current.weather_code,
        wind: data.current.wind_speed_10m
    }
}