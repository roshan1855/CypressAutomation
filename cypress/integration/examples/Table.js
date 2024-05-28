/// <reference types="Cypress" />
 
describe('My Fourth Test Suite', function() 
{
 
it('My Fourth Test case',function() {
 
    cy.visit(Cypress.env('url')+'/AutomationPractice/')
    cy.get('#product[name="courses"] tr td:nth-child(2)').each(($el, index ) =>{

         const word=$el.text()
         if(word.includes("JMETER")){
            cy.get('#product[name="courses"] tr td:nth-child(2)').eq(index).next().then(function(price){

                          const priceText=price.text()
                          expect(priceText).to.equal('25')

            })
            
         }





    })

})
})
