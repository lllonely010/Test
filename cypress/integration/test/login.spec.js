/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://www.google.nl')
  })
 
  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    //cy.window().should('have.property', 'top')
  })
 
 })