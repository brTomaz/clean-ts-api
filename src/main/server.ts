import express = require('express')

const app = express()
const port = 5051
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
