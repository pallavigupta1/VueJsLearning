<template>
  <q-page class="flex  column  "  :class="bgClass">
    <div class="col q-pt-lg q-px-md">
       <q-input
      v-model="search"
    placeholder="search"
    @keyup.enter="getWeatherBySearch" dark borderless   >
        <template v-slot:before>
          <q-icon
          @click="getLocation"
          name="my_location" />
        </template>



        <template v-slot:append>
          <q-btn
          @click="getWeatherBySearch"
          round dense flat icon="search" />
        </template>
      </q-input>
    </div>
<template v-if="weatherDatas">
   <div class="col text-white text-center">
    <div class="text-h4 text-weight-light">
      {{weatherDatas.name}}
    </div>
     <div class="text-h6 text-weight-light">
       {{weatherDatas.weather[0].main}}
     </div>
      <div class="text-h1 text-weight-thin q-my-lg
      relative-position">
        <span>{{Math.round(weatherDatas.main.temp)}}</span>
        <span class="text-h4 relative-position degree">&deg;</span>

      </div>
  </div>
  <div class="col text-center ">
    <img class="pic" src="https://i.pinimg.com/736x/fc/5c/d9/fc5cd978b80e41eb5081740fa2c2bc18.jpg">
  </div>
</template>
<template v-else>
<div class="col column text-center text-white">
  <div class="col text-h4 text-white-thin">
    Quasar<br>Weather
  </div>
    <q-btn
    @click="getLocation"
    class="col" flat>
      <q-icon left size="3em" name="my_location" />
      <div>Find my location</div>
    </q-btn>
</div>

</template>
  <div class="col skyline">

  </div>
  </q-page>

</template>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{
          search: '',
          weatherDatas: null,
          lat: null,
          lon: null,
          apiUrl:'https://api.openweathermap.org/data/2.5/weather',
          apiKey:'d2523fb1bf20a2c7ef5550ce44dbf858'
    }
  },
  computed: {
    bgClass(){
      if(this.weatherDatas){
        if(this.weatherDatas.weather[0].icon.endsWith('n')){
           return 'bg-night'
        }else{
           return 'bg-day'
        }

      }
    }
  },
  methods: {
  getLocation() {
    this.$q.loading.show()
  if(this.$q.platform.is.electron){
    this.$$axios.get('https://freegeoip.app/json/').then(response => {
      this.lat = response.data.latitude
      this.lon = response.data.longitude
      this.getWeatherByCoords()
    })
  }else{
    navigator.geolocation.getCurrentPosition(position=>{
      this.lat = position.coords.latitude
      this.lon = position.coords.longitude
      this.getWeatherByCoords()
    })
  }




  },
  getWeatherByCoords() {
    this.$q.loading.show()
    console.log("hsadfsjdjhd");
    this.$axios('${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric').
    then(response =>{
      this.weatherDatas = response.data
      console.log("hum++++++++",this.weatherDatas);
       this.$q.loading.hide()
    })

  },
  getWeatherBySearch(){
    this.$q.loading.show()
  this.$axios('${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric').
    then(response =>{
      this.weatherDatas = response.data
      console.log("hum++++++++",this.weatherDatas);
      this.$q.loading.hide()
    })
  }
  }

}
</script>

<style>
.q-page{
  background: linear-gradient(to right, #2c3e50, #4ca1af);
  /* background: linear-gradient(to top, #485563, #29323c); */
  /* background: linear-gradient(to left, #ede574, #e1f5c4); */

}
.degree{
  top: -44px;
}
.pic {
  height: 100px;
  width: 100px;
}
.skyline{
  flex: 0 0 100px;
  background: url(https://cdn.pixabay.com/photo/2017/10/16/23/02/brooklyn-2858985_960_720.png);
  background-size: contain;
  background-position: center bottom;
}


</style>
