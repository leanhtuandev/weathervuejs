<template>
  <div id="app" :class="{selected: date > 17}">
    <div class="main" >
      <div class="search-box">
        <input type="text" placeholder="search..." v-model="current" @keypress="fetchApi">
      </div>
      <div class="error" v-if="typeof weather.main == 'undefined'">Not found :(</div>
      <div class="menu" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{weather.name}},{{weather.sys.country}}</div>
          <div class="date">{{dateBuilder()}}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{Math.round(weather.main.temp - 273.15)}}°C</div>
          <div class="weather"><img class="icon" :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png'" alt="">{{weather.weather[0].description}}</div>
          <div class="wind">Wind speed: {{weather.wind.speed}}</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: "app",
  data (){
    return {
      lat: 0,
      lon: 0,
      coordinates: {},
      date: '',
      current: '',
      url_api: 'https://api.openweathermap.org/data/2.5/',
      api_key: 'bebf08f5985d2d3b68fbf91db98246c4',
      weather: {}
    }
  },
  created() {
   setTimeout( ()=>{
     navigator.geolocation.getCurrentPosition( location => {
        fetch(this.url_api+'weather?lat='+ location.coords.latitude +'&lon='+location.coords.longitude+'&appid=' + this.api_key)
        .then(response => response.json())
        .then(data => {
          this.weather = data;
        })
      });
   },100); 
  },
  mounted() {
    // navigator.geolocation.getCurrentPosition(this.position);
  },
  methods: {
    // position(location){
    //   var lat = location.coords.latitude;
    //   var lon = location.coords.longitude;

    // },
    fetchApi(e){
      if(e.key == 'Enter'){
        fetch(this.url_api+'weather?q='+this.current+'&appid='+this.api_key)
          .then(respon => {
            return respon.json();
        }).then(this.setResult);
      }
    },
    setResult(result){
      this.weather = result;
    },
    dateBuilder() {
      let d = new Date();
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      let hour = d.getHours();
      this.date = hour;
      return `${hour}h ${day} ${date} ${month} ${year}`;
    },
  }
}
</script>

<style>
  body {
    background-color:rgba(0, 0, 0, 0.9);
  }
  #app {
    background-image: url('./assets/background2.jpg');
    background-size: cover;
    height: 800px;
    width: 477px;
    margin: 10px auto;
  }

  .selected {
    background-image: url('./assets/background3.jpg') !important;
    background-size: cover;
    height: 800px;
    width: 477px;
    margin: 10px auto;
  }
  .main {
    height: 800px;
    width: auto;
    background-color: rgba(0, 0, 0, 0.4);
    margin: 10px auto;
  }
  .main .search-box {
    text-align: center;
  }
  .main .search-box input {
    margin-top: 60px;
    padding: 10px 20px;
    width: 70%;
    border-radius: 10px 0px 10px 0px;
    font-family: fantasy;
    font-size: 24px;
    color: dimgray;
    background-color: rgba(255, 255, 255,0.9);
    border: 0;
  }
  .main .search-box input:focus,
  .main .search-box input:hover {
    border: 0;
    border-radius: 0px 10px 0px 10px;
    transform: scale(1.2);
    transition: 1s;
  }
  input:focus, input:active {
    border: 0;
    outline: 0;
    outline-style: none;
    outline-width: 0;
  }

  .menu {
    color: white;
    text-align: center;
  }
  .menu .location-box .location {
    padding: 15px 0 0 0;
    font-size: 56px;
    font-family:fantasy;
    font-weight: bold;

  }

  .menu .location-box .date {
    padding-bottom: 15px;
    font-family: inherit;
    font-size: 15px;

  }
  .menu .weather-box .temp {
    display: inline-block;
    padding: 40px 50px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255,0.2);
    font-size: 72px;
    font-family:cursive;
    font-weight: 900;
    margin-top: 40px;
  }

  .menu .weather-box .weather {
    font-size: 48px;
    font-family: fantasy;
    font-weight: bold;
    padding-top: 40px;
  }
  .menu .weather-box .weather .icon {
    display: inline-block;
    width: 15%;
  }
  .menu .weather-box .wind {
    font-size: 24px;
    font-family: cursive;
    font-weight: bold;
  }

  .error {
    color: white;
    font-family: fantasy;
    font-size: 48px;
    text-align: center;
    padding-top: 50px;
    text-transform: uppercase;
  }
</style>
