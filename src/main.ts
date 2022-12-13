import { createApp } from "vue"
import router from "./router"
import pinia from "./store"
import "normalize.css"

import "./assets/css/index.less"
import App from "./App.vue"
import icons from "./global/register-icons"

// 针对ElMessage和E了Loading等组件手动按需引入
// import "element-plus/theme-chalk/el-message.css"

const app = createApp(App)
app.use(icons) // 全局注册element-ui中所有的Icons
app.use(pinia)
app.use(router)
app.mount("#app")
