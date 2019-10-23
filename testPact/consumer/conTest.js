"use strict"

const expect = require("chai").expect
const path = require("path")
const Pact = require("pact")
const axios = require("axios")

const getInventory = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
  
    return axios.request({
      method: "GET",
      baseURL: `${url}:${port}`,
      url: "/inventory",
      headers: { Accept: "application/json" },
    })
  }


describe("The Test API", () => {
    let url = "http://localhost"
    const port = 8992
    const provider = Pact({
      port: port,
      log: path.resolve(process.cwd(), "testPact/logs", "mockserver-integration.log"),
      dir: path.resolve(process.cwd(), "testPact/pacts"),
      spec: 1,
      consumer: "MyTestC",
      provider: "MyTestP",
      pactfileWriteMode: "merge",
    })
  
    const EXPECTED_BODY = [ {
        "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "name" : "Widget Adapter",
        "releaseDate" : "2015-07-20T15:49:04-07:00",
        "manufacturer" : {
          "name" : "ACME Corporation",
          "homePage" : "https://www.acme-corp.com",
          "phone" : "408-867-5309"
        }
      } ]
  
    // Setup the provider
    before(() => provider.setup())
  
    // Write Pact when all tests done
    after(() => provider.finalize())
  
    // verify with Pact, and reset expectations
    afterEach(() => provider.verify())
  
    describe("get /inventory", () => {
      before(done => {
        const interaction = {
          state: "i have a inventory",
          uponReceiving: "a request for inventory",
          withRequest: {
            method: "GET",
            path: "/inventory",
            headers: {
              Accept: "application/json",
            },
          },
          willRespondWith: {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: EXPECTED_BODY,
          },
        }
        provider.addInteraction(interaction).then(() => {
          done()
        })
      })
  
      it("returns the correct response", done => {
        const urlAndPort = {
          url: url,
          port: port
        }
        getInventory(urlAndPort).then(response => {
            expect(response.data).to.eql(EXPECTED_BODY)
            done()
          }, done)
      })
    })
  })



