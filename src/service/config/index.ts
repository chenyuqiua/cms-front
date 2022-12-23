let BASE_URL = " "
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = "http://152.136.185.210:4000"
} else {
  // 非生产环境(开发/测试)
  // BASE_URL = "http://152.136.185.210:5000"
  BASE_URL = "http://127.0.0.1:8081"
}

export const TIME_OUT = 10000
export { BASE_URL }
