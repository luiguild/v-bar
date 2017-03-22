// **************************************************************************************** //
// V-BAR - LUIGUI DELYER | FRONT-END DEV @ WEBRADAR - NEW PRODUCTS, RESEARCH AND INNOVATION //
// GITHUB = https://github.com/luiguild/v-bar.git                                           //
// **************************************************************************************** //

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.config.debug = true
Vue.config.devtools = true

new Vue(Vue.util.extend(App)).$mount('#app')
