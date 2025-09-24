import Page from './Page.js';

/**
 * Contact page object model
 */
class ContactPage extends Page {
    /**
     * XPath locators for contact page elements
     */
    get selectors() {
        return {
            // Header
            pageTitle: '//h1[contains(text(), "Let\'s Start a Conversation")]',
            pageSubtitle: '//p[contains(text(), "Ready to discuss your testing challenges")]',
            
            // Contact form
            contactForm: '//form[@id="contact-form"]',
            firstNameInput: '//input[@id="firstName"]',
            lastNameInput: '//input[@id="lastName"]',
            emailInput: '//input[@id="email"]',
            companyInput: '//input[@id="company"]',
            projectTypeSelect: '//select[@id="projectType"]',
            timelineSelect: '//select[@id="timeline"]',
            messageTextarea: '//textarea[@id="message"]',
            submitButton: '//button[@id="submit-button"]',
            
            // Form labels
            firstNameLabel: '//label[@for="firstName"]',
            lastNameLabel: '//label[@for="lastName"]',
            emailLabel: '//label[@for="email"]',
            companyLabel: '//label[@for="company"]',
            projectTypeLabel: '//label[@for="projectType"]',
            timelineLabel: '//label[@for="timeline"]',
            messageLabel: '//label[@for="message"]',
            
            // Form messages
            successMessage: '//div[@id="success-message"]',
            errorMessage: '//div[@id="error-message"]',
            loadingText: '//span[@id="loading-text"]',
            buttonText: '//span[@id="button-text"]',
            
            // Contact info cards
            quickEmailCard: '//h3[text()="Quick Email"]',
            emailLink: '//a[@href="mailto:nico@isitautomated.com?subject=Testing Project Inquiry"]',
            linkedinLink: '//a[@href="https://linkedin.com/in/schweitz" and contains(text(), "Connect on LinkedIn")]',
            
            // Project type options
            testAutomationOption: '//option[@value="test-automation"]',
            manualTestingOption: '//option[@value="manual-testing"]',
            apiTestingOption: '//option[@value="api-testing"]',
            consultingOption: '//option[@value="consulting"]',
            
            // Timeline options
            immediateOption: '//option[@value="immediate"]',
            oneMonthOption: '//option[@value="1-month"]',
            twoThreeMonthsOption: '//option[@value="2-3-months"]',
            flexibleOption: '//option[@value="flexible"]',
            planningOption: '//option[@value="planning"]'
        };
    }

    /**
     * Navigate to contact page
     */
    async open() {
        await super.open('/contact');
        await this.waitForPageLoad();
    }

    /**
     * Get page title element
     */
    async getPageTitle() {
        return await this.waitForElementByXPath(this.selectors.pageTitle);
    }

    /**
     * Fill in first name
     */
    async fillFirstName(firstName) {
        const input = await this.waitForElementByXPath(this.selectors.firstNameInput);
        await input.clearValue();
        await input.setValue(firstName);
    }

    /**
     * Fill in last name
     */
    async fillLastName(lastName) {
        const input = await this.waitForElementByXPath(this.selectors.lastNameInput);
        await input.clearValue();
        await input.setValue(lastName);
    }

    /**
     * Fill in email
     */
    async fillEmail(email) {
        const input = await this.waitForElementByXPath(this.selectors.emailInput);
        await input.clearValue();
        await input.setValue(email);
    }

    /**
     * Fill in company
     */
    async fillCompany(company) {
        const input = await this.waitForElementByXPath(this.selectors.companyInput);
        await input.clearValue();
        await input.setValue(company);
    }

    /**
     * Select project type
     */
    async selectProjectType(value) {
        const select = await this.waitForElementByXPath(this.selectors.projectTypeSelect);
        await select.selectByAttribute('value', value);
    }

    /**
     * Select timeline
     */
    async selectTimeline(value) {
        const select = await this.waitForElementByXPath(this.selectors.timelineSelect);
        await select.selectByAttribute('value', value);
    }

    /**
     * Fill in message
     */
    async fillMessage(message) {
        const textarea = await this.waitForElementByXPath(this.selectors.messageTextarea);
        await textarea.clearValue();
        await textarea.setValue(message);
    }

    /**
     * Submit the form
     */
    async submitForm() {
        const submitBtn = await this.waitForClickable(this.selectors.submitButton);
        await submitBtn.click();
    }

    /**
     * Fill complete form with test data
     */
    async fillCompleteForm(formData = {}) {
        const defaultData = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test.user@example.com',
            company: 'Test Company',
            projectType: 'test-automation',
            timeline: 'flexible',
            message: 'This is a test message for the contact form to verify it works correctly.'
        };

        const data = { ...defaultData, ...formData };

        await this.fillFirstName(data.firstName);
        await this.fillLastName(data.lastName);
        await this.fillEmail(data.email);
        await this.fillCompany(data.company);
        await this.selectProjectType(data.projectType);
        await this.selectTimeline(data.timeline);
        await this.fillMessage(data.message);
    }

    /**
     * Check if form is present
     */
    async isFormPresent() {
        const form = await this.getElementByXPath(this.selectors.contactForm);
        return await form.isExisting();
    }

    /**
     * Check if success message is displayed
     */
    async isSuccessMessageDisplayed() {
        try {
            const successMsg = await this.getElementByXPath(this.selectors.successMessage);
            return await successMsg.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if error message is displayed
     */
    async isErrorMessageDisplayed() {
        try {
            const errorMsg = await this.getElementByXPath(this.selectors.errorMessage);
            return await errorMsg.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if loading state is active
     */
    async isLoadingStateActive() {
        try {
            const loadingText = await this.getElementByXPath(this.selectors.loadingText);
            return await loadingText.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Get email link element
     */
    async getEmailLink() {
        return await this.waitForElementByXPath(this.selectors.emailLink);
    }

    /**
     * Get LinkedIn link element
     */
    async getLinkedInLink() {
        return await this.waitForElementByXPath(this.selectors.linkedinLink);
    }

    /**
     * Verify all form fields are present
     */
    async verifyFormFields() {
        const firstName = await this.getElementByXPath(this.selectors.firstNameInput);
        const lastName = await this.getElementByXPath(this.selectors.lastNameInput);
        const email = await this.getElementByXPath(this.selectors.emailInput);
        const company = await this.getElementByXPath(this.selectors.companyInput);
        const projectType = await this.getElementByXPath(this.selectors.projectTypeSelect);
        const timeline = await this.getElementByXPath(this.selectors.timelineSelect);
        const message = await this.getElementByXPath(this.selectors.messageTextarea);
        const submit = await this.getElementByXPath(this.selectors.submitButton);

        return {
            firstName: await firstName.isExisting(),
            lastName: await lastName.isExisting(),
            email: await email.isExisting(),
            company: await company.isExisting(),
            projectType: await projectType.isExisting(),
            timeline: await timeline.isExisting(),
            message: await message.isExisting(),
            submit: await submit.isExisting()
        };
    }

    /**
     * Verify required field validation
     */
    async checkRequiredFieldValidation() {
        // Try to submit empty form
        await this.submitForm();
        
        // Check if browser validation prevents submission
        const firstNameInput = await this.getElementByXPath(this.selectors.firstNameInput);
        const isValid = await browser.execute((element) => element.checkValidity(), firstNameInput);
        
        return !isValid; // Should return true if validation is working (form is invalid)
    }

    /**
     * Get all project type options
     */
    async getProjectTypeOptions() {
        const select = await this.waitForElementByXPath(this.selectors.projectTypeSelect);
        const options = await select.$$('option');
        const optionTexts = [];
        
        for (const option of options) {
            const text = await option.getText();
            if (text.trim()) {
                optionTexts.push(text);
            }
        }
        
        return optionTexts;
    }

    /**
     * Get all timeline options
     */
    async getTimelineOptions() {
        const select = await this.waitForElementByXPath(this.selectors.timelineSelect);
        const options = await select.$$('option');
        const optionTexts = [];
        
        for (const option of options) {
            const text = await option.getText();
            if (text.trim()) {
                optionTexts.push(text);
            }
        }
        
        return optionTexts;
    }
}

export default new ContactPage();