const apiUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '5971dd25ea4e88351e9523ae7e039f0c';

const cities = JSON.parse(localStorage.getItem('cities')) || [];

const saveCities = (() => {
    $('#saveCity').on('click', (event) => {
        event.preventDefault();
        let city = $('#cityInput').val();
        $('#cityInput').val('');
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
        location.reload();
    })
})

saveCities();

const displayCities = (() => {
    const cities = JSON.parse(localStorage.getItem('cities'));
    for (const city of cities) {
        const cityBtn = document.getElementById('displayCities');
        cityBtn.insertAdjacentHTML('beforeend', `<button type="button" class="btn cityBtn bg-secondary bg-gradient fs-4 fw-bold rounded-3 my-2">${city}</button>`);
    }
})

displayCities();

const changeCity = (() => {
    $('.cityBtn').on('click', (event) => {
        event.preventDefault();
        const selectedCity = ($(event.target).text());
        localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
        location.reload();
    })
})


changeCity();

const currentDayWeatherData = (() => {
    const currentDayApiCall = `${apiUrl}weather?q=${JSON.parse(localStorage.getItem('selectedCity'))},us&units=imperial&appid=${apiKey}`;
    fetch(currentDayApiCall)
    .then(response => {
            response.json()
            .then((weatherData) => {
                localStorage.setItem('currentWeather', JSON.stringify(weatherData));
            })
            .catch(error => console.error('Error Fetching Weather Data:', error));  
        })
    .catch(error => console.error('Error Connecting to Server:', error));  
})

currentDayWeatherData();

const currentDay = (() => {
    setTimeout(() => {
        const currentDayData = JSON.parse(localStorage.getItem('currentWeather'));
        const currentDayCity = JSON.parse(localStorage.getItem('selectedCity'));
        const date = dayjs().format('MM/DD/YYYY');
        let icon;
        const temp = Math.round(currentDayData.main.temp);
        const high = Math.round(currentDayData.main.temp_max);
        const low = Math.round(currentDayData.main.temp_min);
        const wind = Math.round(currentDayData.wind.speed);
        const humidity = Math.round(currentDayData.main.humidity);
        const time = dayjs.unix(currentDayData.dt).format('HH:mm:ss');
        const sunrise = dayjs.unix(currentDayData.sys.sunrise).format('HH:mm:ss');
        const sunset = dayjs.unix(currentDayData.sys.sunset).format('HH:mm:ss');

        if (time >= sunrise && time <= sunset) {
            // day time
            icon = '&#x263C;';
        } else {
            // night time
            icon = '&#x263E;';
        }
       
        const currentDayCard = document.getElementById('currentDay');
        currentDayCard.insertAdjacentHTML('afterbegin', 
           `<h1 class="fw-bolder pb-3">${currentDayCity}</h1>
            <p>${date}</p>
            <p>${icon}</p>
            <p>Temp: ${temp}°F / High: ${high}°F / Low: ${low}°F</p>
            <p>Wind: ${wind} MPH</p>
            <p>Humidity: ${humidity}%</p>`
        );
    }, 500);
})

currentDay();

const forecastData = (() => {
    const forecastApiCall = `${apiUrl}forecast?q=${JSON.parse(localStorage.getItem('selectedCity'))},us&units=imperial&appid=${apiKey}`
    fetch(forecastApiCall)
    .then(response => {
            response.json()
            .then((forecastData) => {
                let forecastArr = forecastData.list;
                forecastArr.forEach(data => {data.dt_txt = data.dt_txt.slice(0, 10)});              
                const dateArr = forecastArr.map(( data ) => data.dt_txt);
                const filterArr = forecastArr.filter((data, i) =>
                !dateArr.includes(data.dt_txt, i + 1));
                filterArr.shift();
                forecastArr = filterArr;               
                localStorage.setItem('forecastData', JSON.stringify(forecastArr));
            })
            .catch(error => console.error('Error Fetching Forecast Data:', error));  
        })
    .catch(error => console.error('Error Failed Connecting:', error));
})

forecastData();


// testing ----------------------------------------------------------------------------------------------------



// end testing ------------------------------------------------------------------------------------------------