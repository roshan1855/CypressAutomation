/// <reference types="Cypress" />

import HomePage from '../PageObjects/HomePage'


describe('My First Test Suite', function () {


    it('My FirstTest case', function () {
        const homePage=new HomePage()
        function youtubecall() {
            homePage.clearSearchBox()
            homePage.enterKeywordToSearch().type('dreamershivi')
            homePage.SearchButtonClick()

        }

        

        cy.visit("https://www.youtube.com/")

        for (let i = 0; i < 5; i++) {
            cy.wait(10000)
            youtubecall()

            cy.get("#video-title:nth-child(2)[aria-label*='Under ₹500']").click()
        
            cy.wait(50000)
            youtubecall()

            cy.get('#video-title:nth-child(2)[aria-label*="Holi kurta set under ₹1200"]').click()


            cy.wait(50000)
            youtubecall()

            cy.get('#video-title:nth-child(2)[aria-label*="Best kurta set under 1000#shoppingvlog"]').click()


            cy.wait(50000)


            cy.wait(50000)
            youtubecall()

            cy.get("#video-title:nth-child(2)[aria-label*='Ready to wear sari only 500😍']").click()

            cy.wait(50000)

            i = i + 1;

        }

    })


   


})