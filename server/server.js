const express = require('express')
const path = require('path')
const cors = require('cors')
const { connectMongoDB } = require('./database')
const { handleApiError, urlError } = require('./middleweres/handle.api.error')



const port = process.env.PORT || 4455

connectMongoDB()

const app = express()


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(path.resolve('./images')))



const postRouter = require('./routes/posts')
const usersRouter = require('./routes/users')


app.use('/api/posts', postRouter)
app.use('/api/users', usersRouter)


app.use(urlError)
app.use(handleApiError)


app.listen(port, () => console.log('Server is runing on port 4455'))