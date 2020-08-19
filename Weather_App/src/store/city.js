import Vue from 'vue'
import { uid } from 'quasar'

const state = {

}

const mutations = {
    cityName: {
        search: '',
        weatherDatas: null,
        lat: null,
        lon: null,
        apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
        apiKey: 'd2523fb1bf20a2c7ef5550ce44dbf858'
    }

}

const actions = {
    getLocation() {
        this.$q.loading.show()
        if (this.$q.platform.is.electron) {
            this.$$axios.get('https://freegeoip.app/json/').then(response => {
                this.lat = response.data.latitude
                this.lon = response.data.longitude
                this.getWeatherByCoords()
            })
        } else {
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude
                this.lon = position.coords.longitude
                this.getWeatherByCoords()
            })
        }
    },
    getWeatherByCoords() {
        this.$q.loading.show()
        console.log("hsadfsjdjhd");
        this.$axios(`${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric`).then(response => {
            this.weatherDatas = response.data
                // console.log("hum++++++++",this.weatherDatas);
            this.$q.loading.hide()
        })

    },
    getWeatherBySearch() {
        this.$q.loading.show()
        this.$axios(`${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric`).then(response => {
            this.weatherDatas = response.data
                // console.log("hum++++++++",this.weatherDatas);
            this.$q.loading.hide()
        })
    }
}

const getters = {
    bgClass() {
        if (this.weatherDatas) {
            if (this.weatherDatas.weather[0].icon.endsWith('n')) {
                return 'bg-night'
            } else {
                return 'bg-day'
            }

        }
    },
    cityName: (state) => {
        return state.cityName
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
