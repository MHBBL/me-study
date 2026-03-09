<script setup>
import { ref } from 'vue';
const city = ref('');
const weatherData =ref(null);
const error =ref('');

async function searchWeather(){
    const cityname=city.value.trim(); 
    if(!cityname) {
        alert('输入城市名')
        return;
    }
    try{
       const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=f5e2df96fcb459fdec2e33353cbeb594&units=metric&lang=zh_cn`)
       if(!response.ok)throw new Error('未找到')
       weatherData.value=await response.json()
    }catch(e){
        weatherData.value=null
        error.value='未找到该城市'
    }
       
    
}

</script>

<template>
 <div>
    <h1>天气查询</h1>
    <input v-model="city" placeholder="搜索城市">
    <button @click="searchWeather">搜索</button>
    <div v-if="weatherData">
    <h1>{{ error }}</h1>
    <p>{{ weatherData.name}}</p>
    <img :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`">
    <p>{{ weatherData.main.temp }}</p>
    <p>{{ weatherData.weather[0].description }}</p>
    <p>{{ weatherData.main.humidity }}</p>
    <p>{{ weatherData.wind.speed }}</p>

</div>
 </div>

</template>
