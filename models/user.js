const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      minlength: 5,
      maxlength: 25,
      require: true
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 25,
      require: true
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 25,
      require: true
    },
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)