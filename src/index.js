const express = require('express')
const vm = require('vm')
const app = express()
const port = 3000

const scriptCode = `
    // This is a rule
    if (subScenario === 'REMITTANCE') {
        outputParam = 'This is a remittance scenario'
    } else {
        outputParam = 'This is a default scenario'
    }
`
const compiledScript = new vm.Script(scriptCode)

app.use(require('express-status-monitor')())

app.get('/rules', (req, res) => {
    console.log('Request: GET /rules')
  const context = {
    subScenario: req.query.subScenario,
    outputParam: ''
  }
  compiledScript.runInNewContext(context);
  res.send(context.outputParam)
})

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
  console.log(`Example app listening on port ${port}`)
})