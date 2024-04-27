const express = require('express')
require('./db/mongoose')
var cors = require('cors')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
app.use(cors())
const port = process.env.PORT || 5000;

// app.use((req, res, next) => {
//    res.status(503).send('site is currently down. Check back soon.')
// })

// Middleware to parse JSON requests
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
