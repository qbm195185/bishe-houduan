const express = require('express')
const router = require('./router')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middleware/error-handler')
require('./model')

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api',router) 

app.use(errorHandler())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:3000/api`);
})
