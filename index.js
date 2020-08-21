require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routers/routes')
const userRouter = require('./routers/users')
const PORT = process.env.PORT

app.use(express.json())
app.use('/', routes);
app.use('/api/users', userRouter);



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})