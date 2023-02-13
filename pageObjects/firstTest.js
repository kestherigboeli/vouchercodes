let searchCommands = {
    searchRestaurant: function () {
        let date = browser.globals.date
        let number = browser.globals.number
        let category = "//a[@id='categories-dialog']"
        let catBtn = "//*[@id='cookie-popup']/div/button"
        let dialogTitle = "(//*[contains(@class, 'scrolling-touch')]//span)[4]"
        let dialogBtn = "(//span[@data-qa='el:adminableCategoryText'])[4]"
        let restaurantHeaderTitle = "//h1[@data-qa='el:restaurantHeading']"
        let restaurantTitle = "Find restaurant vouchers & offers near you"
        let autoComplete = "//input[@id='google-autocomplete']"
        let selectedDate= `//*[@id='day-select']/option[@value='${date}']`
        let selectedNumber= `//*[@id='people-select']/option[@value='${number}']`
        let searchBtn = "//*[contains(text(),'Find restaurants vouchers')]"

        return this
            .navigate()
            .useXpath()
            .waitForElementVisible(catBtn, 1000)
            .waitForElementVisible(category, 1000)
            .click(catBtn)
            .click(category)
            .pause(300)
            .getText("xpath", dialogTitle, function(result) {
                 this.assert.equal(result.value, "Restaurants");
            })
            .waitForElementVisible(dialogBtn, 1000)
            .click(dialogBtn)
            .getText("xpath", restaurantHeaderTitle, function(result) {
                this.assert.equal(result.value, restaurantTitle);
            })
            .waitForElementVisible(autoComplete, 10000)
            .click(autoComplete)
            .setValue(autoComplete, "London")
            .pause(300)
            .perform(function () {
                const actions = this.actions({async: true});
                return actions
                    .keyDown(Keys.SHIFT)
                    .keyDown(Keys.DOWN)
                    .keyDown(Keys.ENTER)
            })
            .click(selectedDate)
            .click(selectedNumber)
            .click(searchBtn)
    },
};

module.exports = {
    url: 'https://www.vouchercodes.co.uk/',
    commands: [searchCommands],
    elements: {},
}
