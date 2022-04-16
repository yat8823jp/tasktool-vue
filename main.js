import Vue from 'vue'
import APP from './App.vue'
import store from './store'

new Vue ( {
	el: '#app',
	store,
	render: h => h( App )
} )
