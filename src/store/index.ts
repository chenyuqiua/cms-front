import { createPinia } from "pinia"
import type { App } from "vue"
import useLoginStore from "./login/login"

const pinia = createPinia()

function registerStore(app: App<Element>) {
  app.use(pinia)

  // pinia初始化后, 将本地缓存数据加载到pinia中
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
