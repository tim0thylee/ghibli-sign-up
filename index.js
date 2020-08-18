const express = require('express')
const app = express()
const routes = require('./routers/routes')
const PORT = 3000

app.use('/', routes);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})