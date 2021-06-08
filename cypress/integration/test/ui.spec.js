
const myUrl= `https://myserver/login`;

describe("Bank Accounts", function () {

    it("Verify invalid user name", function () {
        cy.visit(myUrl)

        cy.get('#username').type('testli')
        cy.get('#username').should('have.value', `testli`)
        cy.get('#username').should('have.attr', 'aria-describedby').and('equal', 'username-helper')
        cy.get('[data-qa="button.submit"]').should('be.disabled')
      });


      it("Verify valid user name", function () {
        cy.visit(myUrl)

        cy.get('#username').type('testli@de.com')
        cy.get('#username').should('have.value', `testli@de.com`)
        cy.get('#username').should('have.attr', 'aria-describedby').and('equal', 'username-helper')
        cy.get('[data-qa="button.submit"]').should('be.disabled')
      });
    
})