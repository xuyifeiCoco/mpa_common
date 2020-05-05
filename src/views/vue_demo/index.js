import Vue from 'vue';
import App from './App.vue';


window.vueEl = new Vue({
    el: '#app',
    render: (h) => h(App),
});
