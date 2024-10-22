const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter',
  //projectId: "sp124a",
  projectId: "3ve4fq",

  env : {
    stg: "https://uhceservices-stg.optum.com/",
    url: "https://rahulshettyacademy.com"
    //url1: "https://google.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
    
      require('cypress-mochawesome-reporter/plugin')(on);
    },
      experimentalSessionAndOrigin: true,
    
    specPattern: 'cypress/integration/BnE1/*.js'
  },
})

