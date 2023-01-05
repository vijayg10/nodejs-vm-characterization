const express = require('express')
const vm = require('vm')
const app = express()
const port = 3001

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

app.get('/', (req, res) => {
    console.log('Request: GET /')
  const context = {
    subScenario: req.query.subScenario,
    outputParam: ''
  }
  compiledScript.runInNewContext(context, {timeout: 5000, breakOnSigint: true});
  res.send(context.outputParam)
})

app.listen(port, () => {
  console.log(`With-VM test app listening on port ${port}`)
})