import Page from './Page.js';

/**
 * Home page object model
 */
class HomePage extends Page {
    /**
     * XPath locators for home page elements
     */
    get selectors() {
        return {
            // Hero section
            heroTitle: '//h1[contains(text(), "Technical Tester")]',
            heroSubtitle: '//span[contains(text(), "Test Automation Expert")]',
            availabilityStatus: '//span[contains(text(), "Available for new projects")]',
            
            // Services section
            technicalTestingCard: '//h3[text()="Technical Testing"]',
            testAutomationCard: '//h3[text()="Test Automation"]',
            apiTestingCard: '//h3[text()="API Testing"]',
            
            // Industries section
            industriesHeading: '//h2[contains(text(), "Industries & Clients")]',
            unityClient: '//div[text()="Unity"]',
            netsClient: '//div[text()="Nets"]',
            laerdalClient: '//div[text()="Laerdal"]',
            
            // Call to action section
            ctaHeading: '//h2[contains(text(), "Ready to Elevate Your Testing Process")]',
            contactButton: '//a[@href="/contact" and contains(text(), "Start a Conversation")]',
            emailButton: '//a[@href="mailto:nico@isitautomated.com" and contains(text(), "Send Email Directly")]',
            
            // Footer links
            phoneLink: '//span[text()="+45 5377 3508"]',
            linkedinLink: '//a[@href="https://linkedin.com/in/schweitz"]'
        };
    }

    /**
     * Navigate to home page
     */
    async open() {
        await super.open('/');
        await this.waitForPageLoad();
    }

    /**
     * Get hero title element
     */
    async getHeroTitle() {
        return await this.waitForElementByXPath(this.selectors.heroTitle);
    }

    /**
     * Get hero subtitle element
     */
    async getHeroSubtitle() {
        return await this.waitForElementByXPath(this.selectors.heroSubtitle);
    }

    /**
     * Get availability status element
     */
    async getAvailabilityStatus() {
        return await this.waitForElementByXPath(this.selectors.availabilityStatus);
    }

    /**
     * Check if all service cards are present
     */
    async areServiceCardsPresent() {
        const technicalTesting = await this.getElementByXPath(this.selectors.technicalTestingCard);
        const testAutomation = await this.getElementByXPath(this.selectors.testAutomationCard);
        const apiTesting = await this.getElementByXPath(this.selectors.apiTestingCard);
        
        return (await technicalTesting.isExisting()) && 
               (await testAutomation.isExisting()) && 
               (await apiTesting.isExisting());
    }

    /**
     * Check if all client names are present
     */
    async areClientsPresent() {
        const unity = await this.getElementByXPath(this.selectors.unityClient);
        const nets = await this.getElementByXPath(this.selectors.netsClient);
        const laerdal = await this.getElementByXPath(this.selectors.laerdalClient);
        
        return (await unity.isExisting()) && 
               (await nets.isExisting()) && 
               (await laerdal.isExisting());
    }

    /**
     * Click contact button
     */
    async clickContactButton() {
        const button = await this.waitForClickable(this.selectors.contactButton);
        await button.click();
    }

    /**
     * Click email button
     */
    async clickEmailButton() {
        const button = await this.waitForClickable(this.selectors.emailButton);
        await button.click();
    }

    /**
     * Get LinkedIn link
     */
    async getLinkedInLink() {
        return await this.waitForElementByXPath(this.selectors.linkedinLink);
    }

    /**
     * Get phone number text
     */
    async getPhoneNumber() {
        const phoneElement = await this.waitForElementByXPath(this.selectors.phoneLink);
        return await phoneElement.getText();
    }

    /**
     * Verify all essential page elements are present
     */
    async verifyPageElements() {
        const heroTitle = await this.getHeroTitle();
        const heroSubtitle = await this.getHeroSubtitle();
        const availability = await this.getAvailabilityStatus();
        const servicesPresent = await this.areServiceCardsPresent();
        const clientsPresent = await this.areClientsPresent();
        
        return {
            heroTitle: await heroTitle.isDisplayed(),
            heroSubtitle: await heroSubtitle.isDisplayed(),
            availability: await availability.isDisplayed(),
            servicesPresent,
            clientsPresent
        };
    }
}

export default new HomePage();