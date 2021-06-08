

const apiServer = 'https://testserver/api';

describe("Status API", function(){

  context("GET /status", function () {
    it("get the stauts", function () {
      cy.request("GET", `${apiServer}/status`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('OK');
      });
    });
  });
});
