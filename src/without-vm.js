const express = require('express')
const app = express()
const port = 3000

app.use(require('express-status-monitor')())

app.get('/', (req, res) => {
    console.log('Request: GET /')
    let outputParam = ''
    if (req.query.subScenario === 'REMITTANCE') {
        outputParam = 'This is a remittance scenario'
    } else {
        outputParam = 'This is a default scenario'
    }
  res.send(outputParam)
})

app.listen(port, () => {
  console.log(`Without-VM test app listening on port ${port}`)
})