export async function getCoordinates(city) {
   const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)

   const data = await response.json()
 
   const latitude = data.results[0].latitude
   const longitude = data.results[0].longitude

   return {latitude, longitude}
}

export async function getWeather(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,rain,uv_index,wind_speed_10m&current=temperature_2m,rain,wind_speed_10m,apparent_temperature,weather_code,showers,is_day&timezone=auto`)

    const data = await response.json()
     console.log(data.current.time)


    const currentHour = data.current.time.slice(0, 13)

const startIndex = data.hourly.time.findIndex(time =>
    time.startsWith(currentHour)
)

    const hourly = []
    for (let i = startIndex; i < startIndex + 24; i++) {
       hourly.push({
         time: data.hourly.time[i].split("T")[1],
         temperature: data.hourly.temperature_2m[i],
         rain: data.hourly.rain[i]
       })
    }
    console.log(hourly)


    return {
        temperature: data.current.temperature_2m,
        apparentTemperature: data.current.apparent_temperature,
        sunrise: data.daily.sunrise[0].split("T")[1],
        sunset: data.daily.sunset[0].split("T")[1],
        rain: data.current.rain,
        weatherCode: data.current.weather_code,
        wind: data.current.wind_speed_10m,
        hourly: hourly

    }
}
