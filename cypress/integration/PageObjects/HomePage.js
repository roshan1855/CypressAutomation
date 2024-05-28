class HomePage {

    clearSearchBox() {
        return cy.get('#search[aria-label="Search"]').clear()

    }

    enterKeywordToSearch() {
        return cy.get('#search[aria-label="Search"]')

    }

    SearchButtonClick() {

        return cy.get('#search-icon-legacy[aria-label="Search"]').click()
    }
}

export default HomePage;