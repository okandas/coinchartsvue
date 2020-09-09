import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Toasted from 'vue-toasted';
import VTooltip from 'v-tooltip';
import VueFormulate from '@braid/vue-formulate';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
Vue.use(Toasted, {
    position: 'bottom-left',
    keepOnHover: true,
    singleton: true,
    className: 'action',
    containerClass: 'snackbar-container',
    duration: 5000
});
Vue.use(VTooltip);
Vue.use(VueFormulate, {
    rules: {
        phoneNumber: ({ value }) => {
            const phoneNumber = parsePhoneNumberFromString(value, 'ZW');
            if (phoneNumber !== undefined) {
                return phoneNumber.isValid();
            }
            return false;
        }
    }
});
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
//# sourceMappingURL=main.js.map