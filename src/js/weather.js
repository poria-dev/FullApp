// variables

const btn = document.getElementById("btn")
const btnorigin = document.getElementById("btnorigin")
const inp = document.getElementById("inp")
const inp2 = document.getElementById("inp2")
const backimg = document.getElementById("backimg")
const cityCountryText = document.getElementById("cityCountryText")
const temperature = document.getElementById("temperature")
const humidity = document.getElementById("humidity")
const windSpeed = document.getElementById("windSpeed")
const dayNight = document.getElementById("dayNight")
const weatherSvg = document.getElementById("weatherSvg")
const timeicon = document.getElementById("timeicon")
const listhours = document.getElementById("listhours")
const selectmenu = document.querySelectorAll(".selectmenu>li")
const switchli = document.querySelector(".switchli")
const switchmobile = document.querySelector(".switchmobile")
const boxcard = document.querySelector(".boxcard")
const icon_next_day = document.querySelector(".icon_next_day")
const menumobile = document.querySelectorAll(".menumobile>li")
const timeSvg = document.querySelector("#timeSvg")
const warning = document.getElementById("warning")
const aniundersearch = document.getElementById("aniundersearch")
const page_find_origin = document.getElementById("page_find_origin")
const chart = document.querySelector(".chart")
const nameorigin = document.querySelector(".nameorigin")



// variables



// important variable


let api_key = "ss_ShRpvdg0oBjBzCQLaf4IsKJsOZooOFVqexSjAKQR"
let lati = null
let long = null
let reg = /[a-z-A-Z]+\D/
let flag = true
let x;
// important variable


// time top page
const timer_search = document.querySelector(".timer")
let time = new Date()
timer_search.innerHTML = `${time.getFullYear()} / ${time.getMonth() + 1} / ${time.getDate()}  `
// time top page





// selectmenu    /  /  / /

selectmenu.forEach((val) => {

    val.addEventListener("click", (e) => {

        let x = e.currentTarget

        let top = x.offsetTop

        switchli.style.top = `${top}px  `

        page_findOrigin(x)



    })
})

// selectmenu    /  /  / /



// select menu mobile 

menumobile.forEach((val) => {

    val.addEventListener("click", (e) => {

        let mobiletop = e.currentTarget


        let savetop = mobiletop.offsetLeft

        switchmobile.style.left = `${savetop}px`

        page_findOrigin(mobiletop)

    })
})

// select menu mobile 



// page_findOrigin

function page_findOrigin(x) {

    if (x.getAttribute("data-name") == "findorigin") {

        page_find_origin.classList.remove("hidden")
        page_find_origin.classList.add("flex")

    } else {
        page_find_origin.classList.add("hidden")
        page_find_origin.classList.remove("flex")
    }

}

// page_findOrigin





// onload for load

first_onload()
async function first_onload() {

    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=tehran&count=1&language=en&format=json`)

    if (res.ok) {

        const data = await res.json()
        cityCountryText.innerHTML = `${data.results[0].name} / ${data.results[0].country}`
        weather_about(`${data.results[0].latitude}`, `${data.results[0].longitude}`)

    }

}

// onload for load



// fetch first

btn.addEventListener("click", () => {

    // reset

    inp.classList.add("border-white/10")
    inp.classList.remove("border-red-400")

    // reset

    btn.setAttribute("disabled", "disabled")

    let _value = inp.value.trim().toLowerCase()

    if (reg.test(_value)) {

        btn.classList.remove("bg-sky-400/10")
        btn.classList.add("bg-white")
        aniundersearch.classList.add("flex")
        aniundersearch.classList.remove("hidden")

        setTimeout(() => {
            btn.querySelector("img").classList.remove("hidden")
            btn.querySelector("img").classList.add("flex")
        }, 200);


        Promise.all([_name(_value), imgs(_value)]).then(() => {

            btn.querySelector("img").classList.add("hidden")
            btn.querySelector("img").classList.remove("flex")
            btn.classList.add("bg-sky-400/10")
            btn.classList.remove("bg-white")
            aniundersearch.classList.remove("flex")
            aniundersearch.classList.add("hidden")

        }).catch(() => {

            warning.classList.remove("translate-y-5", "opacity-0", "pointer-events-none")
            warning.classList.add("translate-y-0", "opacity-100")
            aniundersearch.classList.remove("flex")
            aniundersearch.classList.add("hidden")
            setTimeout(() => {
                warning.classList.add("translate-y-5", "opacity-0", "pointer-events-none")
                warning.classList.remove("translate-y-0", "opacity-100")
                btn.querySelector("img").classList.add("hidden")
                btn.querySelector("img").classList.remove("flex")
                btn.classList.add("bg-sky-400/10")
                btn.classList.remove("bg-white")
            }, 2000);

        })

    } else {
        inp.classList.remove("border-white/10")
        inp.classList.add("border-red-400")
    }

    setTimeout(() => {

        btn.removeAttribute("disabled")

    }, 2000);

})
function first_fetch(api) {

    return fetch(api).then(res => {

        if (res.ok) {

            return res.json()

        }

        throw new Error(err)

    }).catch((err) => console.log(err))

}

// fetch first 




// name city or country
function _name(va) {


    let temp = first_fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${va}&count=1&language=en&format=json`)

    return temp.then((data) => {

        let latitude = data.results[0].latitude
        let longitude = data.results[0].longitude
        cityCountryText.innerHTML = `${data.results[0].name} / ${data.results[0].country}`
        weather_about(latitude, longitude)

    })

}

// name city or country





// second fetch img

function imgs(_value) {

    let api_imges = first_fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${_value}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&format=json&origin=*`)

    return api_imges.then((item) => {

        let im = Object.values(item.query.pages)[0].imageinfo[0].url
        backimg.style.backgroundImage = `url(${im})`

    })

}



// second fetch img






// about weather

function weather_about(lati, long) {

    let temp = first_fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${long}&daily=weather_code,wind_speed_10m_max,temperature_2m_max&hourly=temperature_2m,rain,showers,snowfall,snow_depth,weather_code,precipitation,wind_speed_10m,temperature_80m&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&`)

    el_create(temp)
    hours(temp)

    temp.then((item) => {

        temperature.innerHTML = `${item.current.temperature_2m}`
        windSpeed.innerHTML = `${item.current.wind_speed_10m}km/h`
        humidity.innerHTML = `${item.current.relative_humidity_2m}%`

        if (item.current.is_day == 0) {

            dayNight.innerHTML = "night"

            timeSvg.innerHTML = `
        <svg
            class="w-12 h-12  text-indigo-200 drop-shadow-[0_0_30px_rgba(165,180,252,0.4)] shrink-0"
            viewBox="0 0 120 120"
            fill="none">

            <path
                d="M78 18C68 24 62 35 62 48C62 68 78 84 98 84C99 84 101 84 102 83C95 96 82 104 67 104C44 104 26 86 26 63C26 40 44 22 67 22C71 22 75 22 78 23C78 21 78 20 78 18Z"
                fill="currentColor"/>

        </svg>
    `

        } else {

            dayNight.innerHTML = "day"

            timeSvg.innerHTML = `
        <svg
            class="w-12 h-12  text-amber-300 drop-shadow-[0_0_30px_rgba(251,191,36,0.4)] shrink-0"
            viewBox="0 0 120 120"
            fill="none">

            <circle
                cx="60"
                cy="60"
                r="22"
                fill="currentColor"/>

            <g
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round">

                <path d="M60 6V20"/>
                <path d="M60 100V114"/>
                <path d="M6 60H20"/>
                <path d="M100 60H114"/>
                <path d="M22 22L32 32"/>
                <path d="M88 88L98 98"/>
                <path d="M98 22L88 32"/>
                <path d="M32 88L22 98"/>

            </g>

        </svg>
    `
        }

        let code = item.current.weather_code
        icon_weather(code)

    })
}

// about weather











// icon weather / /  / /  /  /  / /  /

function icon_weather(code) {
    if ([0].includes(code)) {

        weatherSvg.innerHTML = `
        <svg
            class="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-amber-300 drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]"
            viewBox="0 0 120 120"
            fill="none">

            <circle
                cx="60"
                cy="60"
                r="22"
                fill="currentColor"/>

            <g
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round">

                <path d="M60 6V20"/>
                <path d="M60 100V114"/>
                <path d="M6 60H20"/>
                <path d="M100 60H114"/>

                <path d="M22 22L32 32"/>
                <path d="M88 88L98 98"/>

                <path d="M98 22L88 32"/>
                <path d="M32 88L22 98"/>

            </g>

        </svg>


    `
    }


    else if ([1, 2].includes(code)) {

        weatherSvg.innerHTML = `
        <svg
            class="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-sky-300 drop-shadow-[0_0_30px_rgba(125,211,252,0.4)]"
            viewBox="0 0 120 120"
            fill="none">

            <circle
                cx="38"
                cy="38"
                r="16"
                fill="currentColor"/>

            <g
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round">

                <path d="M38 10V17"/>
                <path d="M38 59V66"/>
                <path d="M10 38H17"/>
                <path d="M59 38H66"/>

                <path d="M18 18L23 23"/>
                <path d="M58 18L53 23"/>

            </g>

            <path
                d="M31 78C31 66 41 56 53 56C63 56 72 62 75 71C77 70 80 69 83 69C94 69 103 78 103 89C103 99 95 107 84 107H40C28 107 18 99 18 88C18 83 23 79 31 78Z"
                fill="currentColor"/>

        </svg>

    `
    }


    else if ([3].includes(code)) {

        weatherSvg.innerHTML = `
        <svg
            class="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-slate-200 drop-shadow-[0_0_30px_rgba(226,232,240,0.35)]"
            viewBox="0 0 120 120"
            fill="none">

            <path
                d="M29 78C29 64 40 53 54 53C66 53 76 60 79 71C81 70 84 69 87 69C99 69 108 78 108 90C108 101 99 109 88 109H40C26 109 16 99 16 87C16 83 21 79 29 78Z"
                fill="currentColor"/>

            <path
                d="M43 62C43 51 52 42 64 42C75 42 84 49 87 59"
                stroke="currentColor"
                stroke-width="7"
                stroke-linecap="round"
                opacity=".65"/>

        </svg>

    `
    }


    else if ([45, 48].includes(code)) {

        weatherSvg.innerHTML = `
        <svg
            class="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-slate-300 drop-shadow-[0_0_30px_rgba(203,213,225,0.35)]"
            viewBox="0 0 120 120"
            fill="none">

            <g
                stroke="currentColor"
                stroke-width="7"
                stroke-linecap="round">

                <path d="M15 36H105"/>
                <path d="M8 60H112"/>
                <path d="M15 84H105"/>

            </g>

        </svg>

    `
    }


    else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {

        weatherSvg.innerHTML = `
        <svg
            class="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-blue-400 drop-shadow-[0_0_30px_rgba(96,165,250,0.45)]"
            viewBox="0 0 120 120"
            fill="none">

            <path
                d="M29 69C29 56 39 46 52 46C63 46 72 53 75 63C77 62 80 61 83 61C94 61 103 70 103 81C103 92 95 100 84 100H40C27 100 18 91 18 80C18 75 22 70 29 69Z"
                fill="currentColor"/>

            <g
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round">

                <path d="M35 106L31 115"/>
                <path d="M60 106L56 115"/>
                <path d="M85 106L81 115"/>

            </g>

        </svg>


    `
    }


    else if ([71, 73, 75, 77, 85, 86].includes(code)) {

        weatherSvg.innerHTML = `
        <svg
            class="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-cyan-200 drop-shadow-[0_0_30px_rgba(165,243,252,0.45)]"
            viewBox="0 0 120 120"
            fill="none">

            <path
                d="M29 69C29 56 39 46 52 46C63 46 72 53 75 63C77 62 80 61 83 61C94 61 103 70 103 81C103 92 95 100 84 100H40C27 100 18 91 18 80C18 75 22 70 29 69Z"
                fill="currentColor"/>

            <g
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round">

                <path d="M34 107V116"/>
                <path d="M29 111H39"/>
                <path d="M30 108L38 115"/>
                <path d="M38 108L30 115"/>

                <path d="M60 107V116"/>
                <path d="M55 111H65"/>
                <path d="M56 108L64 115"/>
                <path d="M64 108L56 115"/>

                <path d="M86 107V116"/>
                <path d="M81 111H91"/>
                <path d="M82 108L90 115"/>
                <path d="M90 108L82 115"/>

            </g>

        </svg>


    `
    }


    else if ([95, 96, 99].includes(code)) {

        weatherSvg.innerHTML = `
        <svg
            class="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-yellow-300 drop-shadow-[0_0_35px_rgba(253,224,71,0.5)]"
            viewBox="0 0 120 120"
            fill="none">

            <path
                d="M29 64C29 51 39 41 52 41C63 41 72 48 75 58C77 57 80 56 83 56C94 56 103 65 103 76C103 87 95 95 84 95H40C27 95 18 86 18 75C18 70 22 65 29 64Z"
                fill="currentColor"
                opacity=".65"/>

            <path
                d="M66 56L48 84H62L54 114L81 76H66L76 56H66Z"
                fill="currentColor"/>

        </svg>

    `
    }
}

// icon weather / /  / /  /  /  / /  /







// create el


function el_create(ite) {

    boxcard.innerHTML = ""

    ite.then((val) => {

        for (let i = 1; i < 7; i++) {

            let code_weather = val.daily.weather_code[i]

            let day = new Date(val.daily.time[i]).toLocaleDateString("en-US", {
                weekday: "long"
            })

            let div = document.createElement("div")

            div.innerHTML = `
                <div class="card w-[145px] sm:w-[155px] lg:flex-1 min-w-[145px] h-full relative overflow-hidden flex flex-col items-center justify-between p-4 border border-white/10 rounded-2xl bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group">

                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-sky-400/50 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                    <div class="time_next_day w-full text-center text-xs sm:text-sm font-semibold text-white/50">
                        ${day}
                    </div>

                    <div class="icon_next_day flex items-center justify-center w-full flex-1 text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.25)]">
                    </div>

                    <div class="temp_next_day flex items-start justify-center text-white">

                        <span class="text-3xl sm:text-4xl font-black tracking-tight">
                            ${val.daily.temperature_2m_max[i]}
                        </span>

                        <sup class="text-sm sm:text-base font-bold text-white/50 mt-1">
                            o
                        </sup>

                    </div>

                </div>
            `

            boxcard.appendChild(div)

            let icon_next_day = div.querySelector(".icon_next_day")

            icon_weather_card(code_weather, icon_next_day)
        }

    })
}

// create el



// /  /  / / / / / / / /  / /  / /  /  / / /

// icon weather 2 card
function icon_weather_card(code, icon_next_day) {

    if ([0].includes(code)) {

        icon_next_day.innerHTML = `
        <svg
            class="w-12 h-12 text-amber-300 drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]"
            viewBox="0 0 120 120"
            fill="none">

            <circle
                cx="60"
                cy="60"
                r="22"
                fill="currentColor"/>

            <g
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round">

                <path d="M60 6V20"/>
                <path d="M60 100V114"/>
                <path d="M6 60H20"/>
                <path d="M100 60H114"/>

                <path d="M22 22L32 32"/>
                <path d="M88 88L98 98"/>

                <path d="M98 22L88 32"/>
                <path d="M32 88L22 98"/>

            </g>

        </svg>
        `
    }


    else if ([1, 2].includes(code)) {

        icon_next_day.innerHTML = `
        <svg
            class="w-12 h-12 text-sky-300 drop-shadow-[0_0_30px_rgba(125,211,252,0.4)]"
            viewBox="0 0 120 120"
            fill="none">

            <circle
                cx="38"
                cy="38"
                r="16"
                fill="currentColor"/>

            <g
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round">

                <path d="M38 10V17"/>
                <path d="M38 59V66"/>
                <path d="M10 38H17"/>
                <path d="M59 38H66"/>

                <path d="M18 18L23 23"/>
                <path d="M58 18L53 23"/>

            </g>

            <path
                d="M31 78C31 66 41 56 53 56C63 56 72 62 75 71C77 70 80 69 83 69C94 69 103 78 103 89C103 99 95 107 84 107H40C28 107 18 99 18 88C18 83 23 79 31 78Z"
                fill="currentColor"/>

        </svg>
        `
    }


    else if ([3].includes(code)) {

        icon_next_day.innerHTML = `
        <svg
            class="w-12 h-12 text-slate-200 drop-shadow-[0_0_30px_rgba(226,232,240,0.35)]"
            viewBox="0 0 120 120"
            fill="none">

            <path
                d="M29 78C29 64 40 53 54 53C66 53 76 60 79 71C81 70 84 69 87 69C99 69 108 78 108 90C108 101 99 109 88 109H40C26 109 16 99 16 87C16 83 21 79 29 78Z"
                fill="currentColor"/>

            <path
                d="M43 62C43 51 52 42 64 42C75 42 84 49 87 59"
                stroke="currentColor"
                stroke-width="7"
                stroke-linecap="round"
                opacity=".65"/>

        </svg>
        `
    }


    else if ([45, 48].includes(code)) {

        icon_next_day.innerHTML = `
        <svg
            class="w-12 h-12 text-slate-300 drop-shadow-[0_0_30px_rgba(203,213,225,0.35)]"
            viewBox="0 0 120 120"
            fill="none">

            <g
                stroke="currentColor"
                stroke-width="7"
                stroke-linecap="round">

                <path d="M15 36H105"/>
                <path d="M8 60H112"/>
                <path d="M15 84H105"/>

            </g>

        </svg>
        `
    }


    else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {

        icon_next_day.innerHTML = `
        <svg
            class="w-12 h-12 text-blue-400 drop-shadow-[0_0_30px_rgba(96,165,250,0.45)]"
            viewBox="0 0 120 120"
            fill="none">

            <path
                d="M29 69C29 56 39 46 52 46C63 46 72 53 75 63C77 62 80 61 83 61C94 61 103 70 103 81C103 92 95 100 84 100H40C27 100 18 91 18 80C18 75 22 70 29 69Z"
                fill="currentColor"/>

            <g
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round">

                <path d="M35 106L31 115"/>
                <path d="M60 106L56 115"/>
                <path d="M85 106L81 115"/>

            </g>

        </svg>
        `
    }


    else if ([71, 73, 75, 77, 85, 86].includes(code)) {

        icon_next_day.innerHTML = `
        <svg
            class="w-12 h-12 text-cyan-200 drop-shadow-[0_0_30px_rgba(165,243,252,0.45)]"
            viewBox="0 0 120 120"
            fill="none">

            <path
                d="M29 69C29 56 39 46 52 46C63 46 72 53 75 63C77 62 80 61 83 61C94 61 103 70 103 81C103 92 95 100 84 100H40C27 100 18 91 18 80C18 75 22 70 29 69Z"
                fill="currentColor"/>

            <g
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round">

                <path d="M34 107V116"/>
                <path d="M29 111H39"/>
                <path d="M30 108L38 115"/>
                <path d="M38 108L30 115"/>

                <path d="M60 107V116"/>
                <path d="M55 111H65"/>
                <path d="M56 108L64 115"/>
                <path d="M64 108L56 115"/>

                <path d="M86 107V116"/>
                <path d="M81 111H91"/>
                <path d="M82 108L90 115"/>
                <path d="M90 108L82 115"/>

            </g>

        </svg>
        `
    }


    else if ([95, 96, 99].includes(code)) {

        icon_next_day.innerHTML = `
        <svg
            class="w-12 h-12 text-yellow-300 drop-shadow-[0_0_35px_rgba(253,224,71,0.5)]"
            viewBox="0 0 120 120"
            fill="none">

            <path
                d="M29 64C29 51 39 41 52 41C63 41 72 48 75 58C77 57 80 56 83 56C94 56 103 65 103 76C103 87 95 95 84 95H40C27 95 18 86 18 75C18 70 22 65 29 64Z"
                fill="currentColor"
                opacity=".65"/>

            <path
                d="M66 56L48 84H62L54 114L81 76H66L76 56H66Z"
                fill="currentColor"/>

        </svg>
        `
    }
}
// icon weather 2 card








// next hours

function hours(abouthours) {
    listhours.innerHTML = ""
    abouthours.then((val) => {

        for (let i = 1; i <= 24; i++) {

            let t = new Date(val.hourly.time[i]).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            })



            let li = document.createElement("li")
            li.innerHTML = `
            
                <li class="flex items-center justify-between gap-3 px-4 py-4 border-b border-white/10">

                                    <span class="time_in_list text-sm text-white/50">

                                        ${t}

                                    </span>

                                    <span class="icon_in_list flex justify-center text-amber-300">

                                        <svg
                                            class="w-7 h-7"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">

                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="3.5"
                                                stroke-width="1.7" />

                                            <path
                                                stroke-linecap="round"
                                                stroke-width="1.7"
                                                d="M12 2v2M12 20v2M4.93 4.93l1.4 1.4M17.67 17.67l1.4 1.4M2 12h2M20 12h2M4.93 19.07l-1.4-1.4M17.67 6.33l-1.4-1.4" />

                                        </svg>

                                    </span>

                                    <span class="temp_in_list text-lg font-bold">

                                       ${val.hourly.temperature_2m[i]}<sup>o</sup>

                                    </span>

                                </li>

            
            
            `

            listhours.appendChild(li)

            let timehours = val.hourly.weather_code[i]

            let icon = li.querySelector(".icon_in_list")

            icon_weather_card(timehours, icon)


        }



    })


}

// next hours





// page tow for origin find


btnorigin.addEventListener("click", async () => {

    let _valueorigin = inp2.value.trim().toLowerCase()
    getname_chart(_valueorigin)

})

// getname_chart("pooria")

async function getname_chart(c) {

    inp2.style.border = ""

    if (c != "" && isNaN(c)) {

        nameorigin.textContent = c

        const res = await fetch(`https://api.nationalize.io/?name=${c}`)
        const data = await res.json()

        chart.innerHTML = ""


        data.country.map((val, index) => {

            let navar = val.probability * 100
            let plus = 0
            let div = document.createElement("div")

            div.innerHTML = `

    <div class="flex items-end justify-between mb-3">

        <div class="flex items-center gap-3">

            <span class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.06] text-xs font-medium text-white/60">
                ${val.country_id}
            </span>

            <div class="flex flex-col gap-1">

                <span class="text-sm font-medium text-white/80">
                    ${val.country_id}
                </span>

                <span class="text-[9px] uppercase tracking-[0.2em] text-white/25">
                    Possible origin
                </span>

            </div>

        </div>

        <span class="text-lg font-semibold text-sky-400">
            ${plus.toFixed(1)}%
        </span>

    </div>


    <div class="relative w-full h-2.5 rounded-full bg-white/[0.05] overflow-hidden">

        <div
            class="originProgress absolute left-0 top-0 h-full w-0 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.5)] transition-all duration-1000 ease-out">
        </div>

    </div>


    <div class="flex justify-between my-2 text-[9px] text-white/20">

        <span>0%</span>

        <span>25%</span>

        <span>50%</span>

        <span>75%</span>

        <span>100%</span>

    </div>

`

            chart.appendChild(div)

            if (plus < navar) {

                x = setInterval(() => {
                    plus++
                }, 100);

            } else {

                clearInterval(x)

            }

            div.querySelector(".originProgress").style.width = `${plus}%`

        })



    } else {

        inp2.style.border = "1px solid red"

    }



}


// page tow for origin find