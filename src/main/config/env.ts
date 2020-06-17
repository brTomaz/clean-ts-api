import 'dotenv/config'

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-ts-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tlak++=*90*haj1920=*--1',
  appUrl: process.env.APP_URL
}
