const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path")
const verifier = require('pact').Verifier


const server = express();
server.use(bodyParser.json());

server.use((req, res, next) => {
  res.header('Content-Type', "application/json");
  next();
});

server.get('/dogs', (req, res) => {
  res.end(JSON.stringify(
    [
      {
        "dog": 1
      },
      {
        "dog": 2
      }
    ]

  ));
});

server.get('/dogs/1', (req, res) => {
  res.end(JSON.stringify(
    [
      {
        "dog": 1
      },
      {
        "dog": 2
      }
    ]

  ));
});


server.post('/setup', (req, res) => {
    const state = req.body.state;
    console.log('state:', state);
    res.end();
  });

  server.listen(8081, () => {
    console.log('User Service listening on http://localhost:8081')
  });

  describe('Pact Verification', () => {
    it('should validate the expectations of Matching Service', () => {
 
      const opts = {
        providerBaseUrl: 'http://localhost:8081',
        providerStatesSetupUrl: 'http://localhost:8081/setup',
        pactUrls: [path.resolve(process.cwd(), "testPact/pacts/myconsumer-myprovider.json")]
      }
 
      return verifier.verifyProvider(opts)
        .then(output => {
          console.log('Pact Verification Complete!')
          console.log(output)
        });
    });
  });