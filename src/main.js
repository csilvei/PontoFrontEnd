import vue from 'vue'
import App from './app'
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

Vue.use(VueResource);

new vue({
    // cria o elemento dentro da pagina
    render: h => h(App),
}).$mount("#app")