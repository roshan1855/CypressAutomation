class HomePage {

    getResourcesTab(){
        return cy.get(':nt-child(9) > div > .dropdown-toggle').click()
    }

    clearSearchBox() {
        return cy.get('#search[aria-label="Search"]').clear()

    }

    enterKeywordToSearch() {
        return cy.get('#search[aria-label="Search"]')

    }

    SearchButtonClick() {

        return cy.get('#search-icon-legacy[aria-label="Search"]').click()
    }

    getManageMember(){
        return cy.get(':nth-child(3) > div > .dropdown-toggle').click()
    }
}

export default HomePage;