import HomePage from '../pageobjects/HomePage.js';
import ContactPage from '../pageobjects/ContactPage.js';
import ExpertisePage from '../pageobjects/ExpertisePage.js';

describe('Navigation and Cross-Page Tests', () => {
    describe('Inter-page Navigation', () => {
        it('should navigate from home to contact page', async () => {
            await HomePage.open();
            await HomePage.clickContactButton();
            
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes('/contact'),
                { timeout: 5000, timeoutMsg: 'Expected to navigate to contact page' }
            );
            
            const currentUrl = await browser.getUrl();
            expect(currentUrl).toContain('/contact');
            
            // Verify we're on the contact page
            const contactPageTitle = await ContactPage.getPageTitle();
            expect(await contactPageTitle.isDisplayed()).toBe(true);
        });

        it('should navigate from expertise to contact page', async () => {
            await ExpertisePage.open();
            await ExpertisePage.clickGetInTouchButton();
            
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes('/contact'),
                { timeout: 5000, timeoutMsg: 'Expected to navigate to contact page' }
            );
            
            const currentUrl = await browser.getUrl();
            expect(currentUrl).toContain('/contact');
        });

        it('should be able to navigate back and forth between pages', async () => {
            // Start at home
            await HomePage.open();
            let currentUrl = await browser.getUrl();
            expect(currentUrl).toContain('/');
            
            // Go to contact
            await HomePage.clickContactButton();
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes('/contact'),
                { timeout: 5000 }
            );
            
            // Navigate back
            await browser.back();
            await browser.waitUntil(
                async () => !(await browser.getUrl()).includes('/contact'),
                { timeout: 5000 }
            );
            
            currentUrl = await browser.getUrl();
            expect(currentUrl).not.toContain('/contact');
        });

        it('should access all main pages directly', async () => {
            // Test home page
            await HomePage.open();
            let title = await HomePage.getTitle();
            expect(title).toContain('Nicolaj Schweitz');
            
            // Test contact page
            await ContactPage.open();
            title = await ContactPage.getTitle();
            expect(title).toContain('Contact');
            
            // Test expertise page
            await ExpertisePage.open();
            title = await ExpertisePage.getTitle();
            expect(title).toContain('Expertise');
        });
    });

    describe('External Links', () => {
        it('should have correct LinkedIn links across pages', async () => {
            // Check home page LinkedIn link
            await HomePage.open();
            const homeLinkedIn = await HomePage.getLinkedInLink();
            let href = await homeLinkedIn.getAttribute('href');
            expect(href).toBe('https://linkedin.com/in/schweitz');
            expect(await homeLinkedIn.getAttribute('target')).toBe('_blank');
            
            // Check contact page LinkedIn link
            await ContactPage.open();
            const contactLinkedIn = await ContactPage.getLinkedInLink();
            href = await contactLinkedIn.getAttribute('href');
            expect(href).toBe('https://linkedin.com/in/schweitz');
            expect(await contactLinkedIn.getAttribute('target')).toBe('_blank');
        });

        it('should have correct email links across pages', async () => {
            // Check home page email link
            await HomePage.open();
            const homeEmailButton = await HomePage.getElementByXPath(HomePage.selectors.emailButton);
            let href = await homeEmailButton.getAttribute('href');
            expect(href).toContain('mailto:nico@isitautomated.com');
            
            // Check contact page email link
            await ContactPage.open();
            const contactEmailLink = await ContactPage.getEmailLink();
            href = await contactEmailLink.getAttribute('href');
            expect(href).toContain('mailto:nico@isitautomated.com');
            
            // Check expertise page email link
            await ExpertisePage.open();
            const expertiseEmailButton = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.emailDirectlyButton);
            href = await expertiseEmailButton.getAttribute('href');
            expect(href).toContain('mailto:nico@isitautomated.com');
        });
    });

    describe('Consistent Content Across Pages', () => {
        it('should have consistent contact information across pages', async () => {
            // Check phone number on home page
            await HomePage.open();
            const phoneNumber = await HomePage.getPhoneNumber();
            expect(phoneNumber).toBe('+45 5377 3508');
            
            // Verify email consistency
            const pages = [HomePage, ContactPage, ExpertisePage];
            const expectedEmail = 'nico@isitautomated.com';
            
            for (const PageObject of pages) {
                await PageObject.open();
                const pageSource = await browser.getPageSource();
                expect(pageSource).toContain(expectedEmail);
            }
        });

        it('should have consistent branding across pages', async () => {
            const pages = [HomePage, ContactPage, ExpertisePage];
            const brandingElements = ['Nicolaj Schweitz', 'Technical Tester'];
            
            for (const PageObject of pages) {
                await PageObject.open();
                const pageSource = await browser.getPageSource();
                
                brandingElements.forEach(element => {
                    expect(pageSource).toContain(element);
                });
            }
        });

        it('should have consistent page titles format', async () => {
            await HomePage.open();
            let title = await HomePage.getTitle();
            expect(title).toContain('Nicolaj Schweitz');
            expect(title).toContain('Technical Tester');
            
            await ContactPage.open();
            title = await ContactPage.getTitle();
            expect(title).toContain('Contact');
            expect(title).toContain('Nicolaj Schweitz');
            
            await ExpertisePage.open();
            title = await ExpertisePage.getTitle();
            expect(title).toContain('Expertise');
            expect(title).toContain('Nicolaj Schweitz');
        });
    });

    describe('Page Load Performance', () => {
        it('should load all pages within reasonable time', async () => {
            const pages = [
                { page: HomePage, name: 'Home' },
                { page: ContactPage, name: 'Contact' },
                { page: ExpertisePage, name: 'Expertise' }
            ];
            
            for (const { page, name } of pages) {
                const startTime = Date.now();
                await page.open();
                await page.waitForPageLoad();
                const loadTime = Date.now() - startTime;
                
                console.log(`${name} page loaded in ${loadTime}ms`);
                expect(loadTime).toBeLessThan(2000); // 2 seconds max for good UX
            }
        });

        it('should have no JavaScript errors on page loads', async () => {
            const pages = [HomePage, ContactPage, ExpertisePage];
            
            for (const PageObject of pages) {
                await PageObject.open();
                
                // Get browser logs to check for JavaScript errors
                const logs = await browser.getLogs('browser');
                const errors = logs.filter(log => log.level === 'SEVERE');
                
                expect(errors.length).toBe(0);
            }
        });
    });

    describe('URL Structure and SEO', () => {
        it('should have clean URLs for all pages', async () => {
            await HomePage.open();
            let url = await browser.getUrl();
            expect(url).toMatch(/\/$|\/index\.html$/);
            
            await ContactPage.open();
            url = await browser.getUrl();
            expect(url).toContain('/contact');
            
            await ExpertisePage.open();
            url = await browser.getUrl();
            expect(url).toContain('/expertise');
        });

        it('should have appropriate meta information', async () => {
            const pages = [HomePage, ContactPage, ExpertisePage];
            
            for (const PageObject of pages) {
                await PageObject.open();
                
                // Check that title is present and not empty
                const title = await browser.getTitle();
                expect(title).toBeTruthy();
                expect(title.length).toBeGreaterThan(0);
                
                // Check for meta viewport (important for responsive design)
                const metaViewport = await browser.execute(() => {
                    const meta = document.querySelector('meta[name="viewport"]');
                    return meta ? meta.getAttribute('content') : null;
                });
                expect(metaViewport).toBeTruthy();
            }
        });
    });

    describe('Cross-Browser Compatibility', () => {
        it('should render consistently across different viewport sizes', async () => {
            const viewports = [
                { width: 1920, height: 1080, name: 'Desktop' },
                { width: 768, height: 1024, name: 'Tablet' },
                { width: 375, height: 667, name: 'Mobile' }
            ];
            
            const pages = [HomePage, ContactPage, ExpertisePage];
            
            for (const { width, height, name } of viewports) {
                await browser.setWindowSize(width, height);
                
                for (const PageObject of pages) {
                    await PageObject.open();
                    await PageObject.waitForPageLoad();
                    
                    // Verify page renders without errors
                    const pageSource = await browser.getPageSource();
                    expect(pageSource).toContain('Nicolaj Schweitz');
                }
            }
            
            // Reset to default size
            await browser.setWindowSize(1920, 1080);
        });
    });
});