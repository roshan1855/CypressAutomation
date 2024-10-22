    ///<reference types="Cypress"/>
    import HomePage from '../PageObjects/HomePage'
    import SelectGroup from '../PageObjects/SelectGroup'
    
    describe('Vaildate user is enrolled successfully or not', function () {
        
        before(() =>{
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
            cy.fixture('user_data').then(function(data) {
                this.data=data
            })
            
        })
        
        it('Validate User Enrollment Flow',{ defaultCommandTimeout: 30000 }, function () {
            
            var selectgrp=new SelectGroup()
            var homepg=new HomePage()
            cy.visit(Cypress.env(this.data.running_env))
            
            cy.get('#optumIdLoginIdentifier').click()
            
            
            const sentArgs = { username: this.data.oh_id, password: this.data.Pwd }
            cy.origin('https://identity.nonprod.onehealthcareid.com/',
                { args: sentArgs },
                ({ username, password }) => { 
                    
                    cy.get('#username').type(username)
                    cy.get('#btnLogin').click()
                    cy.get('#login-pwd').type(password)
                    cy.get('#btnLogin').click()
                    cy.get('#lbl_secAnswer.label-class.undefined').then(function (secQues) {
                        let getQ = ("Security Question text is ", secQues.text())
                        let getQ_split = getQ.split(" ")
                        let lastword = getQ_split.pop()
                        let secAns = lastword.replace("?*", "1")
                        cy.get('#secAnswer[type="password"]').type(secAns)
                        cy.get('#continuebtn').click()
                        
                        
                    })
                    
                })
                
                selectgrp.getSearchGrp().click()
                selectgrp.searchByGrpId()
                selectgrp.enterGroupId().type("1048476")
                selectgrp.searchlens().click()
                selectgrp.selectGrpButton().click()
                selectgrp.getSelectedGrpText().then(function(element){
                    const grptext=element.text()
                    expect(grptext.includes("MILESTONES BEHAVIORAL SERVICES")).to.be.true
                    //FIFI OSCARD AGENCY INC
                    
                })
                homepg.getManageMember()
                cy.get('.primarynav__link-sec.sec-navigation a').contains('Enroll Member').click()
                cy.get('.md-378').contains('person_add').click()
                cy.get("h2.hero-user__content__top__heading").contains("Member Enrollment").then(function(element){
                    const textm=element.text()
                    expect(textm.includes('Member Enrollment')).to.be.true
                })
                cy.get("label[for='checkboxMed']").click()
                cy.get("select#reasonForEnrollment").select("56|New Hire") //Reason for enrollment
                //cy.get(".uhg-input-dropdown__select.ng-pristine.ng-invalid.ng-touched option[value='56|New Hire']").click()
                cy.get("datepicker[datepickerid='qualifyDatepicker'] input[aria-label='Date']").click()
                cy.get("datepicker[datepickerid='qualifyDatepicker'] input[aria-label='Date']").click()
                cy.get("datepicker[datepickerid='qualifyDatepicker'] input[aria-label='Date']").type("02012024")//qualifying date
                const ssnpicker ='0123456789';
                const characters ='abcdefghijklmnopqrstuvwxyz';
                
                
                function generateString(length) {
                    let result = '';
                    const charactersLength = characters.length;
                    for ( let i = 0; i < length; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    
                    return result;
                }
                const Firstname=generateString(6)
                cy.get('input[formcontrolname="firstNameMember"]').type(Firstname)
                cy.get('input[formcontrolname="middleNameMember"]').type("CypressMid")
                const lastName=generateString(7)
                cy.get('input[formcontrolname="lastNameMember"]').type(lastName)
                cy.get('#dateOfBirth [aria-label="Date"]').click()
                cy.get('#dateOfBirth [aria-label="Date"]').type("08161971")//date of birth
                cy.get('select[formcontrolname="gender"]').select('M|Male')
                
                
                
                
                function generateNum(length) {
                    let result = '';
                    const ssnLength = ssnpicker.length;
                    for ( let i = 0; i < length; i++ ) {
                        result += ssnpicker.charAt(Math.floor(Math.random() * ssnLength));
                    }
                    
                    return result;
                }
                
                const ssn=generateNum(9)
                cy.get('input[name="memberSsn"]').type(ssn)
                cy.get('#dateOfHire input').click()
                cy.get('#dateOfHire input').click()
                cy.get('#dateOfHire input').type('02012024') //Date of Hire
                
                const address1=generateString(4)
                const address2=generateString(5)
                const address3=generateString(6)
                cy.get('input[formcontrolname="memberAddress1"]').type(address1+' '+address2) //address line1
                cy.get('input[formcontrolname="memberAddress2"]').type(address3)
                cy.get('input[inputval="zipcode"]').click()
                cy.get('input[inputval="zipcode"]').type('90001')
                
                cy.get('.option-text').click()
                cy.wait(1000)
                cy.intercept("POST","/api/bne/member/secure/v4.0/demographics").as("Enroll_demo")
                cy.get('.button.button-secondary[type="submit"] span').contains('Next').click() //next on chev1
                cy.wait(10000)
                // Call to demographics API
                
                cy.wait("@Enroll_demo").then((interception) =>{
                    
                    const responseBody=interception.response.body
                    const requestBody=interception.request.body
                    cy.writeFile('C:/Users/rosha/git/CypressAutomation/cypress/fixtures/Enrollment/enrolled_Demo_Res.json', responseBody)
                    cy.writeFile('C:/Users/rosha/git/CypressAutomation/cypress/fixtures/Enrollment/enrolled_Demo_Req.json', requestBody)
                })
                cy.get('#current > form.ng-untouched > .accordian > .accordian__item--container > .accordian__content > [style="padding-bottom: 160px;background: white;"] > memberdata > :nth-child(1) > .ng-invalid > :nth-child(2) > .col-lg-6 > .uhg-input__input-error__container > div > .autocompleteInput').click()//select billing group
                cy.get("div[id='101:MILESTONES BEHAVIORAL SERVICES, INC.:1008476']").click()
                cy.get('#current > form.ng-untouched > .accordian > .accordian__item--container > .accordian__content > [style="padding-bottom: 160px;background: white;"] > memberdata > :nth-child(1) > .ng-invalid > :nth-child(3) > .col-lg-6 > .uhg-input__input-error__container > div > .autocompleteInput').click() //select plan
                cy.get("div[id='17633947-CT LIBERTY HMO GATED BUY DOWN PLAN | CT 25/65/3000/100 HMO-']").click()
                //pause
                cy.get('.button.margin-left-10.button-secondary[type="submit"]').click({force: true})//next on chev2
                cy.wait(3000)
                try {
                    cy.get('.button.margin-left-10.button-secondary[type="submit"]').click({force: true})
                    
                }
                catch(err) {
                    cy.log('no need of above statement')
                    
                }
                //next on chev2
                //pause
                
                cy.wait(2000)
                
                cy.intercept("POST","/api/bne/member/secure/v7.0/benefits").as("enrol_bene")
                cy.get('reviewenrollment > .uhg-input-button-container > .button').click() //Submit enrollment 
                
                // Call to demographics API
                
                cy.wait("@enrol_bene").then((interception) =>{
                    
                    const responseBody=interception.response.body
                    const requestBody=interception.request.body
                    cy.writeFile('C:/Users/rosha/git/CypressAutomation/cypress/fixtures/Enrollment/enrol_bene_Res.json', responseBody)
                    cy.writeFile('C:/Users/rosha/git/CypressAutomation/cypress/fixtures/Enrollment/enrol_bene_Req.json', requestBody)
                })
                
                cy.get('.enrollment_confirmation_success_message').then(function(element){
                    const enroll_message=element.text()
                    expect(enroll_message.includes('Member Enrollment is successful!')).to.be.true
                })
                cy.get('.col-lg-5.enrollment_margin-10 a').invoke('text').as('Member_ID')
                cy.get(':nth-child(4) > .col-lg-5 > :nth-child(1)').invoke('text').as('Requested_Coverage_Effective_Date')
                cy.get(':nth-child(5) > .col-lg-5 > :nth-child(1) > span').invoke('text').as('Actual_Coverage_Effective_Date')
                cy.get(':nth-child(6) > .col-lg-5 > :nth-child(1) > span').invoke('text').as('Transaction_id')
            })
            
            
            
            it('It function to Save Enrolled Data in file',function() {
                //cy.log(this.textg)
                cy.writeFile('C:/Users/rosha/git/CypressAutomation/cypress/fixtures/Enrollment/enrolled_data.json', 
                    { Member_ID: this.Member_ID, Requested_Coverage_Effective_Date: this.Requested_Coverage_Effective_Date,
                        Actual_Coverage_Effective_Date: this.Actual_Coverage_Effective_Date, Transaction_id: this.Transaction_id
                    }) 
                    
                })
            })
            
