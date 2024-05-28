/// <reference types="Cypress" />

describe('My Second Test Suite', function () {

    it('My FirstTest case', function () {


        cy.visit(Cypress.env('url'))

        cy.get('a[href="mentorship"]').eq(0).click()

        cy.get('h1[class*="pricing-title"]').should('have.length', 2)

    })
})

