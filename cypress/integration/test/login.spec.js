/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://aab-web-dev05.delft.tjip.com/havik-orientation-nextgen/ui/')
  })
 


it('test',() => {

  cy.get('.maximale-hypotheek-expats')
  .should('be.visible')
  .click()

  cy.get('.progress-bar').should('have.attr')

});





 
 })