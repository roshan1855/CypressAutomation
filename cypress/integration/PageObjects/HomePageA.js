class HomePageA {

    getNameBox(){
        return cy.get('input[name="name"]:nth-child(2)')
    }

    getGenderDropdown() {

        return  cy.get('select')
    }

    getEntrepreneur(){
        return cy.get('#inlineRadio3')
    }

    getShopTab() {
        return cy.contains('Shop')
    }

}

export default HomePageA;