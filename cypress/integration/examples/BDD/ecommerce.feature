Feature: End to End Ecommerce validation

application regression

Scenario: Ecommerce products delivery

Given I open ecommerce page
When I add items to cart
And Validate the total prices
Then selcet the country submit and verify Thankyou
