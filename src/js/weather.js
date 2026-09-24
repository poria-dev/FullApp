// variables

const btn = document.getElementById("btn")
const btnorigin = document.getElementById("btnorigin")
const btncrypto = document.getElementById("btncrypto")
const inp = document.getElementById("inp")
const inp2 = document.getElementById("inp2")
const inp3 = document.getElementById("inp3")
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
const arz_digital = document.querySelector(".arz_digital")
const chart = document.querySelector(".chart")
const nameorigin = document.querySelector(".nameorigin")
const market = document.querySelector(".market")
const figcoin = document.querySelector(".figcoin")
const card_trend = document.querySelector(".card_trend")
const coins = document.querySelector(".coins")


// variables



// important variable


let api_key = "ss_ShRpvdg0oBjBzCQLaf4IsKJsOZooOFVqexSjAKQR"
let lati = null
let long = null
let reg = /[a-z-A-Z]+\D/
const regcrypto = /^[a-zA-Z0-9\s-]+$/
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
        arz(x)


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
        arz(mobiletop)

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




// arz digital

function arz(a) {

    if (a.dataset.name == "arzdigital") {

        arz_digital.classList.remove("hidden")
        arz_digital.classList.add("flex")

    } else {
        arz_digital.classList.add("hidden")
        arz_digital.classList.remove("flex")
    }

}
// arz digital




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

            warning.classList.remove("translate-x-[120%]", "opacity-0", "pointer-events-none")
            warning.classList.add("translate-x-0", "opacity-100")
            aniundersearch.classList.remove("flex")
            aniundersearch.classList.add("hidden")
            setTimeout(() => {
                warning.classList.remove("translate-x-0", "opacity-100")
                warning.classList.add("translate-x-[120%]", "opacity-0", "pointer-events-none")
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

getname_chart("pooria")

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

            div.className = "w-full rounded-xl"

            div.innerHTML = `
        <div class="w-full min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 sm:p-3.5 hover:bg-white/[0.045] hover:border-sky-400/20 transition-all duration-300">

         <div class="flex items-center justify-between gap-2 mb-3">

             <div class="flex items-center gap-2 min-w-0">

            <div class="w-8 h-8 shrink-0 rounded-lg bg-sky-400/10 border border-sky-400/15 flex items-center justify-center">

                <svg class="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 5h12M9 3v2m4 14-4-4 4-4m-7 9h12"/>
                </svg>

            </div>

            <div class="min-w-0">

                <span class="block text-sm font-semibold text-white/80 truncate">
                    ${val.country_id}
                </span>

                <span class="block text-[8px] uppercase tracking-[0.15em] text-white/20">
                    Possible origin
                </span>

            </div>

        </div>

        <div class="flex items-center shrink-0">

            <span class="numberchart text-sm font-bold text-sky-400">
                0
            </span>

            <span class="text-[10px] text-sky-400/50 ml-0.5">
                %
            </span>

        </div>

    </div>


    <div class="relative w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">

        <div
            class="originProgress absolute left-0 top-0 h-full w-0 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.55)] transition-all duration-1000 ease-out">
        </div>

    </div>


    <div class="flex justify-between mt-2 text-[7px] text-white/15">

        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>

    </div>

</div>
`

            chart.appendChild(div)
            let x = setInterval(() => {

                if (plus <= navar) {

                    plus++

                    div.querySelector(".originProgress").style.width = `${plus}%`

                    div.querySelector(".numberchart").innerHTML = `${plus.toFixed(1)}`


                    if (plus > 70) {

                        div.style.border = "1px solid #22c55e"
                        div.style.boxShadow = "0 0 20px rgba(34,197,94,0.15)"

                    } else if (plus > 40 && plus <= 70) {

                        div.style.border = "1px solid #eab308"
                        div.style.boxShadow = "0 0 20px rgba(234,179,8,0.15)"

                    } else if (plus > 0 && plus <= 40) {

                        div.style.border = "1px solid #ef4444"
                        div.style.boxShadow = "0 0 20px rgba(239,68,68,0.15)"

                    }

                } else {

                    clearInterval(x)

                }

            }, 10)

        })

    } else {

        inp2.style.border = "1px solid red"

    }

}


// page tow for origin find









// page 3 for crypto


let api_k_crypto = "CG-CX3fHctj779kbmwxFxpXY2FH"


btncrypto.addEventListener("click", () => {

    inp3.classList.add("border-white/10")
    inp3.classList.remove("border-red-400")

    btncrypto.setAttribute("disabled", "disabled")

    let _value_crypto = inp3.value.trim().toLowerCase()

    let searchIcon = btncrypto.querySelector("svg")
    let loader = btncrypto.querySelector("img")

    if (regcrypto.test(_value_crypto)) {

        btncrypto.classList.remove("bg-sky-400/10")
        btncrypto.classList.add("bg-white")

        aniundersearch.classList.add("flex")
        aniundersearch.classList.remove("hidden")

        setTimeout(() => {

            searchIcon.classList.add("hidden")

            loader.classList.remove("hidden")
            loader.classList.add("flex")

        }, 200)

        Promise.all([
            digi(_value_crypto),
            trend_coin()
        ])
            .then(() => {

                searchIcon.classList.remove("hidden")

                loader.classList.add("hidden")
                loader.classList.remove("flex")

                btncrypto.classList.add("bg-sky-400/10")
                btncrypto.classList.remove("bg-white")

                aniundersearch.classList.remove("flex")
                aniundersearch.classList.add("hidden")

            })
            .catch((err) => {

                console.log(err)

                searchIcon.classList.remove("hidden")

                loader.classList.add("hidden")
                loader.classList.remove("flex")

                btncrypto.classList.add("bg-sky-400/10")
                btncrypto.classList.remove("bg-white")

                aniundersearch.classList.remove("flex")
                aniundersearch.classList.add("hidden")

                warning.classList.remove(
                    "translate-x-[120%]",
                    "opacity-0",
                    "pointer-events-none"
                )

                warning.classList.add(
                    "translate-x-0",
                    "opacity-100"
                )

                setTimeout(() => {

                    warning.classList.remove(
                        "translate-x-0",
                        "opacity-100"
                    )

                    warning.classList.add(
                        "translate-x-[120%]",
                        "opacity-0",
                        "pointer-events-none"
                    )

                }, 2000)

            })

    } else {

        inp3.classList.remove("border-white/10")
        inp3.classList.add("border-red-400")

    }

    setTimeout(() => {
        btncrypto.removeAttribute("disabled")
    }, 2000)

})

digi("solana")



// for card

let cryptoChart = null

async function digi(_value_crypto) {

    const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${_value_crypto}`,
        {
            headers: {
                "x-cg-demo-api-key": `${api_k_crypto}`
            }
        }
    )

    if (res.ok) {

        const data = await res.json()

        if (!data.coins.length) {
            throw new Error("Coin Not Found")
        }
        let id_coin = data.coins[0].id

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id_coin}`,
            {
                headers: {
                    "x-cg-demo-api-key": `${api_k_crypto}`
                }
            }
        )
            .then(item => item.json())
            .then(async (result) => {



                market.innerHTML = `

                <div class="box_markrt w-full sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)] min-h-[150px] rounded-2xl border border-white/10 bg-white/[0.025] p-4 flex flex-col justify-between hover:bg-white/[0.04] hover:border-sky-400/20 transition-all duration-300">

                    <div class="title_box flex items-center justify-between">
                        <span class="text-xs font-medium text-white/40">Market Cap</span>

                        <svg class="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 20V10m6 10V4m6 16v-7m6 7V7"/>
                        </svg>
                    </div>

                    <div class="number_title mt-3 text-xl sm:text-2xl font-bold text-white">
                        ${tabdil(result[0].market_cap)}
                    </div>

                    <div class="status mt-2 flex items-center justify-between gap-2">

                        <div class="color_svg flex items-center gap-1.5 text-emerald-400">

                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m5 15 6-6 4 4 4-6"/>
                                <path stroke-linecap="round" stroke-width="1.8" d="M17 7h2v2"/>
                            </svg>

                            <span class="text-xs font-semibold">
                                ${result[0].market_cap_change_percentage_24h.toFixed(2)}%
                            </span>

                        </div>

                        <span class="text-[10px] text-white/25">24h</span>

                    </div>

                </div>

                <div class="box_markrt w-full sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)] min-h-[150px] rounded-2xl border border-white/10 bg-white/[0.025] p-4 flex flex-col justify-between hover:bg-white/[0.04] hover:border-sky-400/20 transition-all duration-300">

                    <div class="title_box flex items-center justify-between">
                        <span class="text-xs font-medium text-white/40">24h Volume</span>

                        <svg class="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 18 9 12l4 4 7-10"/>
                        </svg>
                    </div>

                    <div class="number_title mt-3 text-xl sm:text-2xl font-bold text-white">
                        ${tabdil(result[0].total_volume)}
                    </div>

                    <div class="status mt-2 flex items-center justify-between gap-2">

                        <div class="color_volume flex items-center gap-1.5 text-emerald-400">

                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m5 15 6-6 4 4 4-6"/>
                                <path stroke-linecap="round" stroke-width="1.8" d="M17 7h2v2"/>
                            </svg>

                            <span class="text-xs font-semibold">
                                ${result[0].price_change_percentage_24h.toFixed(2)}%
                            </span>

                        </div>

                        <span class="text-[10px] text-white/25">24h</span>

                    </div>

                </div>

                <div class="box_markrt w-full sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)] min-h-[150px] rounded-2xl border border-white/10 bg-white/[0.025] p-4 flex flex-col justify-between hover:bg-white/[0.04] hover:border-sky-400/20 transition-all duration-300">

                    <div class="title_box flex items-center justify-between">

                        <span class="text-xs font-medium text-white/40">
                            24h Price Change
                        </span>

                        <svg class="w-4 h-4 text-sky-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" stroke-width="1.5"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7v10M15 9.5c0-1.1-1.2-2-3-2s-3 .9-3 2 1.2 2 3 2 3 .9 3 2-1.2 2-3 2-3-.9-3-2"/>
                        </svg>

                    </div>

                    <div class="number_title mt-3 text-xl sm:text-2xl font-bold text-white">
                        $${result[0].current_price.toFixed(2)}
                    </div>

                    <div class="status mt-2 flex items-center justify-between gap-2">

                        <div class="color_price flex items-center gap-1.5 text-emerald-400">

                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m5 15 6-6 4 4 4-6"/>
                                <path stroke-linecap="round" stroke-width="1.8" d="M17 7h2v2"/>
                            </svg>

                            <span class="text-xs font-semibold">
                                ${result[0].price_change_percentage_24h.toFixed(2)}%
                            </span>

                        </div>

                        <span class="text-[10px] text-white/25">
                            24h
                        </span>

                    </div>

                </div>

                <div class="box_markrt w-full sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)] min-h-[150px] rounded-2xl border border-white/10 bg-white/[0.025] p-4 flex flex-col justify-between hover:bg-white/[0.04] hover:border-sky-400/20 transition-all duration-300">

                    <div class="title_box flex items-center justify-between">

                        <span class="text-xs font-medium text-white/40">
                            Market Cap Rank
                        </span>

                        <svg class="w-4 h-4 text-sky-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 17 9 11l4 4 8-10"/>
                        </svg>

                    </div>

                    <div class="number_title mt-3 text-xl sm:text-2xl font-bold text-white">
                        ${"#" + result[0].market_cap_rank}
                    </div>

                    <div class="status mt-2 flex items-center justify-between gap-2">

                        <span class="text-[10px] text-white/25">
                            Rank
                        </span>

                    </div>

                </div>

                

                `


                color_change(market.querySelector(".color_svg"), result[0].market_cap_change_percentage_24h)

                color_change(market.querySelector(".color_volume"), result[0].price_change_percentage_24h)

                color_change(market.querySelector(".color_price"), result[0].price_change_percentage_24h)



                // chart liber
                // /  / / / / / /
                const chartBox = document.querySelector(".chart_coin")

                if (cryptoChart) {
                    cryptoChart.remove()
                    cryptoChart = null
                }

                chartBox.innerHTML = ""

                const chart = LightweightCharts.createChart(chartBox, {
                    autoSize: true,

                    layout: {
                        background: {
                            type: "solid",
                            color: "transparent"
                        },

                        textColor: "#ffffff"
                    },

                    grid: {
                        vertLines: {
                            color: "rgba(255,255,255,0.04)"
                        },

                        horzLines: {
                            color: "rgba(255,255,255,0.04)"
                        }
                    },

                    rightPriceScale: {
                        borderColor: "rgba(255,255,255,0.08)"
                    },

                    timeScale: {
                        borderColor: "rgba(255,255,255,0.08)"
                    }
                })

                cryptoChart = chart

                const areaSeries = chart.addSeries(
                    LightweightCharts.AreaSeries,
                    {
                        lineColor: "#38bdf8",
                        topColor: "rgba(56,189,248,0.25)",
                        bottomColor: "rgba(56,189,248,0.02)",
                        lineWidth: 2
                    }
                )

                const chartRes = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id_coin}/market_chart?vs_currency=usd&days=1`,
                    {
                        headers: {
                            "x-cg-demo-api-key": `${api_k_crypto}`
                        }
                    }
                )

                if (!chartRes.ok) {
                    throw new Error("Chart API Error")
                }

                const chartData = await chartRes.json()

                const prices = chartData.prices.map(item => ({
                    time: Math.floor(item[0] / 1000),
                    value: item[1]
                }))

                areaSeries.setData(prices)

                chart.timeScale().fitContent()

                aboutcoinfig(result)



            })

        // chart liber
        // /  / / / / / /
    } else {

        throw new Error("Crypto Search Error")

    }


}

// for card

function color_change(element, value) {

    if (value >= 0) {

        element.classList.remove("text-red-400")
        element.classList.add("text-emerald-400")

    } else {

        element.classList.remove("text-emerald-400")
        element.classList.add("text-red-400")

    }

}


// for big number

function tabdil(num) {

    if (num >= 1000000000000) {

        return (num / 1000000000000).toFixed(2) + "T"

    }

    if (num >= 1000000000) {

        return (num / 1000000000).toFixed(2) + "B"

    }

    if (num >= 1000000) {

        return (num / 1000000).toFixed(2) + "M"

    }

    if (num >= 1000) {

        return (num / 1000).toFixed(2) + "K"

    }

    return num.toFixed(2)

}

// for big number





// for img and about coin
function aboutcoinfig(x) {


    figcoin.innerHTML = `
        

    <img src="${x[0].image}" alt="" class="namecoin w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0">

        <h4 class="name_coin flex flex-col gap-1 min-w-0 text-sm sm:text-base font-semibold text-white">
            <span class="truncate">${x[0].id}</span>
            <span class="symbol text-[11px] text-white/30 uppercase">${x[0].symbol}</span>
        </h4>

        <h3 class="price_icon ml-auto text-lg sm:text-2xl font-bold text-white whitespace-nowrap">
        ${x[0].current_price}$
        </h3>

        <span class="up_down_coin shrink-0 px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-400/10 text-emerald-400">
            ${(x[0].price_change_percentage_24h).toFixed(2)}%
        </span>


        
        `
    if (price_change_percentage_24h >= 0) {

        figcoin.querySelector(".up_down_coin").classList.remove("text-red-400")
        figcoin.querySelector(".up_down_coin").classList.add("text-emerald-400")

    } else {

        figcoin.querySelector(".up_down_coin").classList.add("text-red-400")
        figcoin.querySelector(".up_down_coin").classList.remove("text-emerald-400")

    }

}

// for img and about coin


// trend important tooo colllllllllllllll

trend_coin()
all_coins()

function trend_coin(put) {

    return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`, {
        headers: {
            "x-cg-demo-api-key": `${api_k_crypto}`
        }
    }).then(res => res.json()).then((data) => {

        card_trend.innerHTML = ""

        for (let i = 1; i <= 3; i++) {

            let ran = parseInt(Math.random() * 100)

            let coin = data[ran]

            card_trend.innerHTML += `

            <div class="w-full">

                <figure class="w-full min-h-[82px] flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.045] hover:border-sky-400/20 transition-all duration-300">

                    <img class="imgtrend w-10 h-10 rounded-full shrink-0" src="${coin.image}" alt="${coin.name}">

                    <h4 class="nametrend min-w-0 flex-1 truncate text-sm font-semibold text-white">
                        ${coin.name}
                    </h4>

                    <div class="flex flex-col items-end gap-1 shrink-0">

                        <span class="pricetrend text-sm font-semibold text-white">
                            $${coin.current_price.toFixed(2)}
                        </span>

                        <span class="up_down_trend text-[11px] font-medium ${coin.price_change_percentage_24h >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }">

                            ${coin.price_change_percentage_24h.toFixed(2)}%

                        </span>

                    </div>

                    <span class="icontrend shrink-0">

                        ${coin.price_change_percentage_24h >= 0

                    ?

                    `
                            <svg class="w-10 h-6 text-emerald-400" viewBox="0 0 40 24" fill="none">

                                <path
                                    d="M1 20C5 20 6 15 10 16C14 17 15 10 19 12C23 14 25 5 29 8C33 11 34 4 39 2"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />

                            </svg>
                            `

                    :

                    `
                            <svg class="w-10 h-6 text-red-400" viewBox="0 0 40 24" fill="none">

                                <path
                                    d="M1 4C5 4 6 9 10 8C14 7 15 14 19 12C23 10 25 19 29 16C33 13 34 20 39 22"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />

                            </svg>
                            `
                }

                    </span>

                </figure>

            </div>

            `
        }

    }).catch(err => {

        console.log(err)

    })

}

// trend important tooo colllllllllllllll




// all coins




function all_coins() {

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1`, {
        headers: {
            "x-cg-demo-api-key": `${api_k_crypto}`
        }
    }).then(res => res.json()).then((data) => {

        coins.innerHTML = ""

        data.forEach((coin) => {

            coins.innerHTML += `

            <div class="w-full p-3">

                <div class="w-full min-h-[78px] flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.045] hover:border-sky-400/20 transition-all duration-300">

                    <img
                        class="w-9 h-9 rounded-full shrink-0"
                        src="${coin.image}"
                        alt="${coin.name}"
                    >

                    <div class="min-w-0 flex-1">

                        <h4 class="truncate text-sm font-semibold text-white">
                            ${coin.name}
                        </h4>

                        <span class="text-[10px] text-white/30 uppercase">
                            ${coin.symbol}
                        </span>

                    </div>

                    <div class="flex flex-col items-end gap-1 shrink-0">

                        <span class="text-sm font-semibold text-white">
                            $${coin.current_price.toFixed(2)}
                        </span>

                        <span class="text-[11px] font-medium ${coin.price_change_percentage_24h >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }">

                            ${coin.price_change_percentage_24h.toFixed(2)}%

                        </span>

                    </div>

                    <span class="shrink-0">

                        ${coin.price_change_percentage_24h >= 0

                    ?

                    `
                            <svg class="w-9 h-5 text-emerald-400" viewBox="0 0 40 24" fill="none">

                                <path
                                    d="M1 20C5 20 6 15 10 16C14 17 15 10 19 12C23 14 25 5 29 8C33 11 34 4 39 2"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />

                            </svg>
                            `

                    :

                    `
                            <svg class="w-9 h-5 text-red-400" viewBox="0 0 40 24" fill="none">

                                <path
                                    d="M1 4C5 4 6 9 10 8C14 7 15 14 19 12C23 10 25 19 29 16C33 13 34 20 39 22"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />

                            </svg>
                            `
                }

                    </span>

                </div>

            </div>

            `
        })

    }).catch(err => {

        console.log(err)

    })

}




// all coins





// page 3 for crypto


