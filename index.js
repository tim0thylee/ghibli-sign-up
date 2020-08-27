require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routers/routes')
const userRouter = require('./routers/users')
const PORT = process.env.PORT

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(express.json())
app.use('/', routes)
app.use('/api/users', userRouter)
app.use(unknownEndpoint)
app.use(errorHandler)



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})