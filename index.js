const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes/router.js')
require('dotenv').config()
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/', router)

mongoose.connect(process.env.DATABASE_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(async () => console.log('Successful connection!'))
.catch(err => console.log('Connection error!', err))

app.listen(process.env.PORT || 5000, ()=>{
	console.log('Running!')
})