// Function to fetch weather data based on city name
async function fetchWeatherByCity(city) {
    const apiKey='368fecc3849e6629d3779427e7408daa';
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response=await fetch(apiUrl);
        const data=await response.json();
        if(response.ok) {
            updateWeather(data);
        }else {
            alert('location not found: please enter a valid location');
        }
    }catch (error) {
        console.error('Error fetching weather data', error);
    }
}
// Function to fetch weather data based on coordinates
async function fetchWeatherByCoordinates(lat, lon) {
    const apiKey='368fecc3849e6629d3779427e7408daa';
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try {
        const response=await fetch(apiUrl);
        const data=await response.json();
        if (response.ok) {
            updateWeather(data);
        }else {
            alert('Unable to fetch weather data for your location');
        }
    }catch (error) {
        console.error('Error fetching weather data', error);
    }
}
// Update weather data
function updateWeather(data) {
    const tempdata=document.getElementById('temp1');
    const raindata=document.getElementById('rain');
    const locationdata=document.getElementById('location');
    const humiditydata=document.getElementById('humidity');
    const windspeeddata=document.getElementById('windspeed');
    const temp=`${Math.round(data.main.temp)}°C`;
    const rain=data.rain ? `Raining: ${data.rain['1h'] || data.rain['3h']} mm` : 'No rain';
    const location=`Current location: ${data.name}`;
    const humidity=`${data.main.humidity}%`;
    const windspeed=`${data.wind.speed} km/h`;
    tempdata.textContent=temp;
    raindata.textContent=rain;
    locationdata.textContent=location;
    humiditydata.textContent=humidity;
    windspeeddata.textContent=windspeed;
}
// Pass the city name using search input function
function controlSearch() {
    const city = document.querySelector('.search input').value;
    if (city) {
        fetchWeatherByCity(city);
    } else {
        alert('Please enter a city name');
    }
}
// Get weather data for current location
function getCurrentLocationWeather() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        },error => {
            console.error('Error getting current location', error);
            alert('Unable to get your current location');
        });
    }else{
        alert('Geolocation is not supported by your browser');
    }
}
// Add event listener for search button
document.querySelector('.search button').addEventListener('click', controlSearch);
// Add event listener for enter key press in input box
document.querySelector('.search input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        controlSearch();
    }
});
// Fetch weather data for current location on page load
window.onload = getCurrentLocationWeather;
