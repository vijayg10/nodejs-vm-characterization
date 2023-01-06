const express = require('express')
const { Engine } = require('json-rules-engine')
const app = express()
const port = 3002

let engine = new Engine()

engine.addRule({
  priority: 1,
  conditions: {
    all: [{
      fact: 'subScenario',
      operator: 'equal',
      value: 'REMITTANCE'
    },]
  },
  event: {
    type: 'REMITTANCE',
    params: {
      message: 'This is a remittance scenario'
    }
  }
})
engine.addRule({
  priority: 2,
  conditions: {
    all: [{
      fact: 'subScenario',
      operator: 'notEqual',
      value: 'REMITTANCE'
    },]
  },
  event: {
    type: 'DEFAULT',
    params: {
      message: 'This is a default scenario'
    }
  }
})

app.use(require('express-status-monitor')())

app.get('/', (req, res) => {
    console.log('Request: GET /')
  const facts = {
    subScenario: req.query.subScenario
  }
  engine
  .run(facts)
  .then(({ events }) => {
    res.send(events[0].params.message)
  })
})

app.listen(port, () => {
  console.log(`With-VM test app listening on port ${port}`)
})