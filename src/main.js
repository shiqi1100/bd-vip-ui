import { createApp } from 'vue'
import App from './App.vue'
import BlocksNext, {Icon} from 'blocks-next'
import 'blocks-next/theme-default/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import calendar from "/dist/vip-ui.js";
import initRouter from './router'
const router = initRouter()
createApp(App).use(BlocksNext).use(Icon).use(router).use(ElementPlus).use(calendar).mount('#app')
