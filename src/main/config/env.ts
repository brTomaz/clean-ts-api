import 'dotenv/config'

export default {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT,
  appUrl: process.env.APP_URL
}
