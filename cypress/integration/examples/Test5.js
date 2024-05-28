/// <reference types="Cypress" />
 
describe('My Fourth Test Suite', function() 
{
 
it('My Fourth Test case',function() {
 
    cy.visit(Cypress.env('url')+"/AutomationPractice/")
    cy.get('#opentab').invoke('removeAttr','target').click()
    cy.wait(4000)
    cy.origin("https://www.qaclickacademy.com/", () => {

    cy.get("#navbarSupportedContent a[href='about.html']").click()
    cy.get('.mt-50 h2').should('contain','Welcome to QAClick Academy ')

    })
    
//save it to git hub
   

})
})
