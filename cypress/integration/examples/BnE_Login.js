/// <reference types="Cypress" />
 
describe('BnE Login', function() 
{
 
it('Login to Broker and Employer Portal',function() {
 
    cy.visit("https://uhceservices-stg.optum.com")
    cy.get('#optumIdLoginIdentifier').click()
    cy.wait(4000)
    cy.origin("https://identity.nonprod.onehealthcareid.com/", () =>{
        cy.wait(4000)
        cy.get('#username').type('roshan_stg3')
        cy.wait(1000)
        cy.get('#btnLogin').click()
        cy.wait(4000)
        cy.get('#login-pwd').type('Letter#12')
        cy.get('#btnLogin').click()
        cy.wait(4000)
        cy.get('#lbl_secAnswer').then(function(secQues)
        {
            let getQ=("Security Question text is", secQues.text())
            cy.wait(1000)
            let getQ_split=getQ.split(" ")
            cy.wait(1000)
            let lastword=getQ_split.pop()
            cy.wait(1000)
            let secAns=lastword.replace("?*","1")
            cy.wait(1000)
            cy.get('#secAnswer').type(secAns)
            cy.wait(1000)
            cy.get('#continuebtn').click()
            cy.wait(1000)
        }
            
            )
        

    })
    cy.wait(20000)
    cy.get('.globalheader--desktop__settings__dropdown a[href="#"]').contains('Logout').click({force:true})


})
})