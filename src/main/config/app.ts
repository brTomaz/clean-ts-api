import setupMiddlewares from './middlewares'
import express = require('express')

const app = express()
setupMiddlewares(app)

export default app
