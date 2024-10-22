class SelectGroup {

    getSearchGrp(){
    return cy.get('.hero-user__content > membergroupinfo > .hero-user__content__bottom > :nth-child(3) > .hero-user__content__bottom__text > .parent_select_grp_link')
    }
   
    searchByGrpId(){
    return cy.get('.col-lg > :nth-child(1) > .uhg-input__container > .uhg-input__input-error__container > .uhg-input-dropdown__select').select(['Search by Group ID'])
    }
   
    enterGroupId(){
    return cy.get('input[placeholder="Enter Group ID"]')
    }
   
    searchlens(){
    return cy.get('.uhg-input__input-error__container > .broker_input_right_margin > .button__icon > .material-icons-outlined')
    }
   
    selectGrpButton(){
    return cy.get('.search-results-row-group__button--container > .button > .button__label')
    }
    getSelectedGrpText(){
    return cy.get('.hero-user__content > membergroupinfo > .hero-user__content__bottom > .hero-user__content__bottom__text > :nth-child(1)')
    }
   }
   
   export default SelectGroup;