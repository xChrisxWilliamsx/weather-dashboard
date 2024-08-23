let urlQuery;
const apiUrl = "";
const apiKey = "";

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
        cityBtn.insertAdjacentHTML('beforeend', `<button type="button" class="btn bg-secondary bg-gradient fs-4 rounded-3 my-2">${city}</button>`);
    }
})

displayCities();