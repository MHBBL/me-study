const cityInput=document.getElementById('city-input');
const btn=document.getElementById('search-btn');
const weather=document.getElementById('weather-card');
const cityName=document.getElementById('city-name');
const temperature=document.getElementById('temperature');
const description=document.getElementById('description');
const humidity=document.getElementById('humidity');
const wind=document.getElementById('wind');
const weatherIcon = document.getElementById('weather-icon');

const API_KEY = 'f5e2df96fcb459fdec2e33353cbeb594';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city){
    const url=`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=zh_cn`;
    const response=await fetch(url);

    if(!response.ok){
        throw new Error('城市未找到');
    }
    const data=await response.json();
    return data;
}
function displayWeather(data){
    cityName.textContent = data.name;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.textContent=Math.round(data.main.temp)+'c';
    description.textContent=data.weather[0].description;
    humidity.textContent=data.main.humidity+'%';
    wind.textContent=data.wind.speed+'m/s';
    weather.classList.remove('hidden');
}
async function handleSearch(){
    const city=cityInput.value.trim();

    if(!city){
        alert('请输入城市名');
        return;
    }
    try {
        btn.textContent = '查询中...';
        btn.disabled = true;
  
        const data = await getWeather(city);
        displayWeather(data);
      } catch (error) {
        alert('未找到该城市，请检查输入');
        weather.classList.add('hidden');
      } finally {
        btn.textContent = '查询';
        btn.disabled = false;
      }   
}
btn.addEventListener('click', handleSearch);

  cityInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
});