import Vue from 'vue';
import App from './components/App';

import router from './router';

// import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism.css';

Vue.config.productionTip = false;

document.write('<div id="app"></div>');
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');



