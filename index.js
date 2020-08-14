const express = require('express')
var path = require("path");
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

require("./routes.js")(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})