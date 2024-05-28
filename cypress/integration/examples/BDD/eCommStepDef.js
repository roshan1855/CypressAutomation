import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor/steps"
const homePage1 = new HomePageA()
const shopPage = new ShopPage()
Given(' I open ecommerce page', ()=>

{
    cy.visit(Cypress.env('url')+'/angularpractice/')

})

When('I add items to cart',()=> {
    homePage1.getShopTab().click()
    this.data.productName.forEach(function(element){
        cy.selectProduct(element)

    })

     var sum=0

    shopPage.getCheckout().click()

})

And('Validate the total prices',()=>{
    cy.get('tr td:nth-child(4) strong').each(($el, index, list) => {

        const amount=$el.text()
        var res=amount.split(" ")
        var res=res[1]
        sum=sum+Number(res)

    }).then(function(){

        cy.log(sum)
    })

    cy.get('h3 strong').then(function(element){

         var totalAmount=element.text()
         var total=totalAmount.split(" ")
         var total=total[1].trim()
         expect(sum).to.equal(Number(total))
    })

})

Then('selcet the country submit and verify Thankyou', ()=>{
    cy.get('button.btn.btn-success').click()
    cy.get('input[id="country"]').type("India")
    cy.wait(12000)
    cy.get('.suggestions > ul > li > a').click()
    cy.get('#checkbox2').click({force: true})
    cy.contains("Purchase").click()
    cy.get('.alert').then(function(element)
{

    const textA=element.text()
    expect(textA.includes('Success')).to.be.true

    })


})