// variables

const btn = document.getElementById("btn")
const inp = document.getElementById("inp")
const backimg = document.getElementById("backimg")
const cityCountryText = document.getElementById("cityCountryText")
const temperature = document.getElementById("temperature")
const humidity = document.getElementById("humidity")
const windSpeed = document.getElementById("windSpeed")



// variables

let api_key = "ss_ShRpvdg0oBjBzCQLaf4IsKJsOZooOFVqexSjAKQR"
let lati = null
let long = null

// time top page
const timer_search = document.querySelector(".timer")
let time = new Date()
timer_search.innerHTML = `${time.getFullYear()} / ${time.getMonth() + 1} / ${time.getDate()}  `
// time top page


btn.addEventListener("click", () => {

    let _value = inp.value.trim().toLowerCase()

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${_value}&count=1&language=en&format=json`).then(res => {
        if (res.ok) {
            return res.json()
        }
        throw new Error(err)
    }).then((data) => {

        lati = data.results[0].latitude
        long = data.results[0].longitude
        cityCountryText.innerHTML = `${data.results[0].name} / ${data.results[0].country}`

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${long}&daily=weather_code,wind_speed_10m_max,temperature_2m_max&hourly=temperature_2m,rain,showers,snowfall,snow_depth,weather_code,precipitation,wind_speed_10m,temperature_80m&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=auto&past_days=3`).then(item => item.json())
            .then((result) => {


                temperature.innerHTML = `${parseInt(result.current.temperature_2m)}`
                humidity.innerHTML=`${result.current.relative_humidity_2m}%`
                windSpeed.innerHTML=`${result.current.wind_speed_10m}km/h`
                
                



            })




    }).catch((err) => console.log(err)
    )

})

