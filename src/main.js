import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt' // 설치한 라이브러리 임포트

// mitt 라이브러리 사용하는 문법
// 모든 컴포넌트가 emitter를 사용하기 위해서
// 모든 컴포넌트가 쓰는 변수나 라이브러리는 main.js에서 선언한다.
// ex) axios 등록 등
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;

// vuex 추가 - app.use(store)... 하면 모든 컴포넌트가 store.js에 접근해서 store.js안에 저장된 state를 사용할 수 있음
import store from './store.js';

import './registerServiceWorker'

app.use(store).mount('#app')
