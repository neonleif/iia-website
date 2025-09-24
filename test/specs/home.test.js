import HomePage from '../pageobjects/HomePage.js';

describe('Home Page Tests', () => {
    beforeEach(async () => {
        await HomePage.open();
    });

    describe('Page Structure and Content', () => {
        it('should display the correct page title', async () => {
            const title = await HomePage.getTitle();
            expect(title).toContain('Nicolaj Schweitz');
            expect(title).toContain('Technical Tester');
        });

        it('should display hero section with main title and subtitle', async () => {
            const heroTitle = await HomePage.getHeroTitle();
            const heroSubtitle = await HomePage.getHeroSubtitle();
            
            expect(await heroTitle.isDisplayed()).toBe(true);
            expect(await heroSubtitle.isDisplayed()).toBe(true);
            
            const titleText = await heroTitle.getText();
            const subtitleText = await heroSubtitle.getText();
            
            expect(titleText).toContain('Technical Tester');
            expect(subtitleText).toContain('Test Automation Expert');
        });

        it('should show availability status', async () => {
            const availability = await HomePage.getAvailabilityStatus();
            expect(await availability.isDisplayed()).toBe(true);
            
            const availabilityText = await availability.getText();
            expect(availabilityText).toContain('Available for new projects');
        });

        it('should display all service cards', async () => {
            const servicesPresent = await HomePage.areServiceCardsPresent();
            expect(servicesPresent).toBe(true);
        });

        it('should display all client companies', async () => {
            const clientsPresent = await HomePage.areClientsPresent();
            expect(clientsPresent).toBe(true);
        });

        it('should verify all essential page elements are present and displayed', async () => {
            const elements = await HomePage.verifyPageElements();
            
            expect(elements.heroTitle).toBe(true);
            expect(elements.heroSubtitle).toBe(true);
            expect(elements.availability).toBe(true);
            expect(elements.servicesPresent).toBe(true);
            expect(elements.clientsPresent).toBe(true);
        });
    });

    describe('Navigation and Links', () => {
        it('should navigate to contact page when contact button is clicked', async () => {
            await HomePage.clickContactButton();
            
            // Wait for navigation
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes('/contact'),
                { timeout: 5000, timeoutMsg: 'Expected to navigate to contact page' }
            );
            
            const currentUrl = await browser.getUrl();
            expect(currentUrl).toContain('/contact');
        });

        it('should have correct href for email button', async () => {
            const emailButton = await HomePage.getElementByXPath(HomePage.selectors.emailButton);
            const href = await emailButton.getAttribute('href');
            
            expect(href).toContain('mailto:nico@isitautomated.com');
        });

        it('should have correct LinkedIn link', async () => {
            const linkedinLink = await HomePage.getLinkedInLink();
            const href = await linkedinLink.getAttribute('href');
            
            expect(href).toBe('https://linkedin.com/in/schweitz');
            expect(await linkedinLink.getAttribute('target')).toBe('_blank');
        });

        it('should display correct phone number', async () => {
            const phoneNumber = await HomePage.getPhoneNumber();
            expect(phoneNumber).toBe('+45 5377 3508');
        });
    });

    describe('Text Content Validation', () => {
        it('should contain key technical testing keywords', async () => {
            const pageSource = await browser.getPageSource();
            
            const keywords = [
                'Technical Testing',
                'Test Automation',
                'API Testing',
                'Selenium WebDriver',
                'Postman',
                'Unity',
                'Nets',
                'Laerdal'
            ];
            
            keywords.forEach(keyword => {
                expect(pageSource).toContain(keyword);
            });
        });

        it('should contain call to action text', async () => {
            const ctaHeading = await HomePage.getElementByXPath(HomePage.selectors.ctaHeading);
            const ctaText = await ctaHeading.getText();
            
            expect(ctaText).toContain('Ready to Elevate Your Testing Process');
        });
    });

    describe('Responsive Design', () => {
        it('should be responsive on mobile viewport', async () => {
            await browser.setWindowSize(375, 667); // iPhone SE size
            
            const heroTitle = await HomePage.getHeroTitle();
            expect(await heroTitle.isDisplayed()).toBe(true);
            
            // Reset to default size
            await browser.setWindowSize(1920, 1080);
        });

        it('should be responsive on tablet viewport', async () => {
            await browser.setWindowSize(768, 1024); // iPad size
            
            const servicesPresent = await HomePage.areServiceCardsPresent();
            expect(servicesPresent).toBe(true);
            
            // Reset to default size
            await browser.setWindowSize(1920, 1080);
        });
    });
});