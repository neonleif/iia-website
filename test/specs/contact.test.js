import ContactPage from '../pageobjects/ContactPage.js';

describe('Contact Page Tests', () => {
    beforeEach(async () => {
        await ContactPage.open();
    });

    describe('Page Structure and Content', () => {
        it('should display the correct page title', async () => {
            const title = await ContactPage.getTitle();
            expect(title).toContain('Contact');
            expect(title).toContain('Nicolaj Schweitz');
        });

        it('should display page header with title and subtitle', async () => {
            const pageTitle = await ContactPage.getPageTitle();
            expect(await pageTitle.isDisplayed()).toBe(true);
            
            const titleText = await pageTitle.getText();
            expect(titleText).toContain('Let\'s Start a Conversation');
        });

        it('should display contact form', async () => {
            const isFormPresent = await ContactPage.isFormPresent();
            expect(isFormPresent).toBe(true);
        });

        it('should verify all form fields are present', async () => {
            const formFields = await ContactPage.verifyFormFields();
            
            expect(formFields.firstName).toBe(true);
            expect(formFields.lastName).toBe(true);
            expect(formFields.email).toBe(true);
            expect(formFields.company).toBe(true);
            expect(formFields.projectType).toBe(true);
            expect(formFields.timeline).toBe(true);
            expect(formFields.message).toBe(true);
            expect(formFields.submit).toBe(true);
        });

        it('should display email and LinkedIn contact information', async () => {
            const emailLink = await ContactPage.getEmailLink();
            const linkedinLink = await ContactPage.getLinkedInLink();
            
            expect(await emailLink.isDisplayed()).toBe(true);
            expect(await linkedinLink.isDisplayed()).toBe(true);
            
            const emailHref = await emailLink.getAttribute('href');
            const linkedinHref = await linkedinLink.getAttribute('href');
            
            expect(emailHref).toContain('mailto:nico@isitautomated.com');
            expect(linkedinHref).toBe('https://linkedin.com/in/schweitz');
        });
    });

    describe('Form Validation', () => {
        it('should validate required fields', async () => {
            const validationWorking = await ContactPage.checkRequiredFieldValidation();
            expect(validationWorking).toBe(true);
        });

        it('should validate email format', async () => {
            await ContactPage.fillFirstName('Test');
            await ContactPage.fillLastName('User');
            await ContactPage.fillEmail('invalid-email');
            await ContactPage.fillCompany('Test Company');
            await ContactPage.fillMessage('Test message');
            
            await ContactPage.submitForm();
            
            // Check if browser validation prevents submission
            const emailInput = await ContactPage.getElementByXPath(ContactPage.selectors.emailInput);
            const isValid = await browser.execute((element) => element.checkValidity(), emailInput);
            
            expect(isValid).toBe(false);
        });

        it('should require all mandatory fields to be filled', async () => {
            // Try submitting with only some fields filled
            await ContactPage.fillFirstName('Test');
            await ContactPage.fillEmail('test@example.com');
            
            await ContactPage.submitForm();
            
            // Check if form validation prevents submission
            const messageInput = await ContactPage.getElementByXPath(ContactPage.selectors.messageTextarea);
            const isValid = await browser.execute((element) => element.checkValidity(), messageInput);
            
            expect(isValid).toBe(false);
        });
    });

    describe('Form Functionality', () => {
        it('should fill all form fields correctly', async () => {
            const testData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                company: 'Test Company Ltd',
                projectType: 'test-automation',
                timeline: 'flexible',
                message: 'I would like to discuss test automation solutions for our web application.'
            };

            await ContactPage.fillCompleteForm(testData);

            // Verify values were set correctly
            const firstNameInput = await ContactPage.getElementByXPath(ContactPage.selectors.firstNameInput);
            const lastNameInput = await ContactPage.getElementByXPath(ContactPage.selectors.lastNameInput);
            const emailInput = await ContactPage.getElementByXPath(ContactPage.selectors.emailInput);
            const companyInput = await ContactPage.getElementByXPath(ContactPage.selectors.companyInput);
            const messageTextarea = await ContactPage.getElementByXPath(ContactPage.selectors.messageTextarea);

            expect(await firstNameInput.getValue()).toBe(testData.firstName);
            expect(await lastNameInput.getValue()).toBe(testData.lastName);
            expect(await emailInput.getValue()).toBe(testData.email);
            expect(await companyInput.getValue()).toBe(testData.company);
            expect(await messageTextarea.getValue()).toBe(testData.message);
        });

        it('should have correct project type options', async () => {
            const options = await ContactPage.getProjectTypeOptions();
            
            const expectedOptions = [
                'Select project type',
                'Test Automation',
                'Manual Testing',
                'API Testing',
                'Consulting & Strategy'
            ];

            expectedOptions.forEach(option => {
                expect(options).toContain(option);
            });
        });

        it('should have correct timeline options', async () => {
            const options = await ContactPage.getTimelineOptions();
            
            const expectedOptions = [
                'Select timeline',
                'Immediate (Within 2 weeks)',
                'Within 1 month',
                '2-3 months',
                'Flexible timeline',
                'Still planning'
            ];

            expectedOptions.forEach(option => {
                expect(options).toContain(option);
            });
        });

        it('should clear form values when cleared', async () => {
            await ContactPage.fillFirstName('Test');
            await ContactPage.fillLastName('User');
            
            const firstNameInput = await ContactPage.getElementByXPath(ContactPage.selectors.firstNameInput);
            const lastNameInput = await ContactPage.getElementByXPath(ContactPage.selectors.lastNameInput);
            
            await firstNameInput.clearValue();
            await lastNameInput.clearValue();
            
            expect(await firstNameInput.getValue()).toBe('');
            expect(await lastNameInput.getValue()).toBe('');
        });
    });

    describe('Form Submission', () => {
        it('should show loading state when form is submitted', async () => {
            await ContactPage.fillCompleteForm();
            
            // Submit form
            await ContactPage.submitForm();
            
            // Note: In a real test environment, we would need to mock the Formspree endpoint
            // For now, we'll just verify the form submission behavior
            
            // Check that submit button becomes disabled
            const submitButton = await ContactPage.getElementByXPath(ContactPage.selectors.submitButton);
            
            // Wait a moment for the loading state to activate
            await browser.pause(100);
            
            // The button should be disabled during submission
            const isDisabled = await submitButton.getAttribute('disabled');
            expect(isDisabled).not.toBe(null);
        });

        it('should have correct form action and method', async () => {
            const form = await ContactPage.getElementByXPath(ContactPage.selectors.contactForm);
            
            const action = await form.getAttribute('action');
            const method = await form.getAttribute('method');
            
            expect(action).toBe('https://formspree.io/f/xgvnvwgq');
            expect(method.toLowerCase()).toBe('post');
        });

        it('should have honeypot field for spam protection', async () => {
            const honeypotField = await ContactPage.getElementByXPath('//input[@name="_gotcha"]');
            expect(await honeypotField.isExisting()).toBe(true);
            
            const style = await honeypotField.getAttribute('style');
            expect(style).toContain('display:none');
        });
    });

    describe('Text Content Validation', () => {
        it('should contain key contact information text', async () => {
            const pageSource = await browser.getPageSource();
            
            const expectedTexts = [
                'Let\'s Start a Conversation',
                'Ready to discuss your testing challenges',
                'Quick Email',
                'Connect on LinkedIn',
                'First Name',
                'Last Name',
                'Email Address',
                'Project Description'
            ];
            
            expectedTexts.forEach(text => {
                expect(pageSource).toContain(text);
            });
        });

        it('should have proper form labels', async () => {
            const firstNameLabel = await ContactPage.getElementByXPath(ContactPage.selectors.firstNameLabel);
            const emailLabel = await ContactPage.getElementByXPath(ContactPage.selectors.emailLabel);
            const messageLabel = await ContactPage.getElementByXPath(ContactPage.selectors.messageLabel);
            
            expect(await firstNameLabel.getText()).toContain('First Name');
            expect(await emailLabel.getText()).toContain('Email Address');
            expect(await messageLabel.getText()).toContain('Project Description');
        });
    });

    describe('Responsive Design', () => {
        it('should be responsive on mobile viewport', async () => {
            await browser.setWindowSize(375, 667);
            
            const form = await ContactPage.getElementByXPath(ContactPage.selectors.contactForm);
            expect(await form.isDisplayed()).toBe(true);
            
            // Reset viewport
            await browser.setWindowSize(1920, 1080);
        });

        it('should maintain form functionality on tablet viewport', async () => {
            await browser.setWindowSize(768, 1024);
            
            await ContactPage.fillFirstName('Mobile Test');
            const firstNameInput = await ContactPage.getElementByXPath(ContactPage.selectors.firstNameInput);
            expect(await firstNameInput.getValue()).toBe('Mobile Test');
            
            // Reset viewport
            await browser.setWindowSize(1920, 1080);
        });
    });
});