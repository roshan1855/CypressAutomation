const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter',
  projectId: "sp124a",
  env : {
    url: "https://rahulshettyacademy.com"
    //url1: "https://google.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
    
      require('cypress-mochawesome-reporter/plugin')(on);
    },
      experimentalSessionAndOrigin: true,
    
    specPattern: 'cypress/integration/examples/*.js'
  },
  });
