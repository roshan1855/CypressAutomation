/// <reference types="cypress" />


describe('My First Test Suite',function()
{

it('My FirstTest case',function() {

    cy.visit('https://rahulshettyacademy.com/angularAppdemo/library')
    

    cy.intercept({
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'

    },
    {

        statusCode: 200,
        body  :  [ {
                "book_name": "RestAssured with Java",
                "isbn": "RSU",
                "aisle": "2301"
            }]

    }).as('bookretrivals')
    cy.get('.btn-primary').click()
    cy.wait('@bookretrivals')

})

})