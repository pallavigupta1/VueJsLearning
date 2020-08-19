<template>
  <q-page class="flex  column  "  :class="bgClass">
    <div class="col q-pt-lg q-px-md">
       <q-input
      v-model="search"
    placeholder="search"
    @keyup.enter="getWeatherBySearch" dark borderless >
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
      <!-- You Are searching wheather for {{search}} -->
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
import { mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  data(){
    return{
      showCityName: false
    }
  },
  computed: {
    ...mapGetters('cityName', ['cityName'])
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
