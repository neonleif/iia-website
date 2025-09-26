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

    async open() {
        await super.open('/');
        await this.waitForPageLoad();
    }

    async getHeroTitle() {
        return await this.waitForElementByXPath(this.selectors.heroTitle);
    }

    async getHeroSubtitle() {
        return await this.waitForElementByXPath(this.selectors.heroSubtitle);
    }

    async getAvailabilityStatus() {
        return await this.waitForElementByXPath(this.selectors.availabilityStatus);
    }

    async areServiceCardsPresent() {
        const technicalTesting = await this.getElementByXPath(this.selectors.technicalTestingCard);
        const testAutomation = await this.getElementByXPath(this.selectors.testAutomationCard);
        const apiTesting = await this.getElementByXPath(this.selectors.apiTestingCard);
        
        return (await technicalTesting.isExisting()) && 
               (await testAutomation.isExisting()) && 
               (await apiTesting.isExisting());
    }

    async areClientsPresent() {
        const unity = await this.getElementByXPath(this.selectors.unityClient);
        const nets = await this.getElementByXPath(this.selectors.netsClient);
        const laerdal = await this.getElementByXPath(this.selectors.laerdalClient);
        
        return (await unity.isExisting()) && 
               (await nets.isExisting()) && 
               (await laerdal.isExisting());
    }

    async clickContactButton() {
        const button = await this.waitForClickable(this.selectors.contactButton);
        await button.click();
    }

    async clickEmailButton() {
        const button = await this.waitForClickable(this.selectors.emailButton);
        await button.click();
    }

    async getLinkedInLink() {
        return await this.waitForElementByXPath(this.selectors.linkedinLink);
    }

    async getPhoneNumber() {
        const phoneElement = await this.waitForElementByXPath(this.selectors.phoneLink);
        return await phoneElement.getText();
    }

    /**
     * Returns object with display status of essential page elements
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