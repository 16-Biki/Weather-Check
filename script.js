//function to fetch weather data based on city name;
async function fetchWeather(city) {
    const apiKey='368fecc3849e6629d3779427e7408daa';
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try{
        const response=await fetch(apiUrl);
        const data=await response.json();
        if(response.ok){
            updateWeather(data);
        }else{
            alert('city not found: please enter a valid city');
        }
    }catch(error){
        console.error('Error fetching weather data',error);
    }
}
//updat weather data
function updateWeather(data){
    const tempdata=document.getElementById('temp1');
    const raindata = document.getElementById('rain');
    const citydata=document.getElementById('city1');
    const humiditydata=document.getElementById('humidity');
    const windspeeddata=document.getElementById('windspeed')
    const temp=`${Math.round(data.main.temp)}°C`;
    const rain = data.rain ? `Raining : ${data.rain['1h'] || data.rain['3h']} mm` : 'No rain';
    const city=data.name;
    const humidity=`${data.main.humidity}%`;
    const windspeed=`${data.wind.speed} km/h`;
    tempdata.textContent=temp;
    raindata.textContent = rain;
    citydata.textContent=city;
    humiditydata.textContent=humidity;
    windspeeddata.textContent=windspeed;
}
//pass the city name using search input function
function controlSearch(){
    const city=document.querySelector('.search input').value;
    if(city){
        fetchWeather(city);
    }else{
        alert('please enter a city name');
    }
}
//add event listener for search button
document.querySelector('.search button').addEventListener('click',controlSearch);
//add event listener for  enter key press in input box
document.querySelector('.search input').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        controlSearch()
    }
});