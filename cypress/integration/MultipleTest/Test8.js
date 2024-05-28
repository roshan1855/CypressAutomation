///<reference types="Cypress"/>
import HomePageA from '../PageObjects/HomePageA'
import ShopPage from '../PageObjects/ShopPage'

describe('Fixtures Test Suite', function()
{
    before(function(){
        
        // run once before all the test in the block
        cy.fixture('example').then(function(data){
        this.data=data
       })
    })

it('Test case 1', function(){
    Cypress.config('defaultCommandTimeout',8000)

    cy.visit(Cypress.env('url')+'/angularpractice/')

    const homePage1 = new HomePageA()
    const shopPage = new ShopPage()
    homePage1.getNameBox().type(this.data.name)
    homePage1.getGenderDropdown().select(this.data.gender)
    homePage1.getNameBox().should('have.value', this.data.name)
    homePage1.getNameBox().should('have.attr','minlength','2')
    homePage1.getEntrepreneur().should('be.disabled') 
    homePage1.getShopTab().click()
    this.data.productName.forEach(function(element){
        cy.selectProduct(element)

    })

     var sum=0

    shopPage.getCheckout().click()
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



    cy.get('button.btn.btn-success').click()
    cy.get('input[id="country"]').type("India")
    cy.wait(12000)
    cy.get('.suggestions > ul > li > a').click()
    cy.get('#checkbox2').click({force: true})
    cy.contains("Purchase").click()
    cy.get('.alert').then(function(element)
{

    const textA=element.text()
    expect(textA.includes('Fail This test intensionally')).to.be.true

    })



})


})