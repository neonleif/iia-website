import HomePage from '../pageobjects/HomePage.js';

describe('Minimal Test Suite', () => {
    beforeEach(async () => {
        await HomePage.open();
    });

    describe('Home Page Basic Tests', () => {
        it('should load home page successfully', async () => {
            const title = await HomePage.getTitle();
            console.log('Page title:', title);
            
            expect(title).toContain('Nicolaj Schweitz');
        });

        it('should display main heading', async () => {
            const heroTitle = await HomePage.getHeroTitle();
            expect(await heroTitle.isDisplayed()).toBe(true);
            
            const titleText = await heroTitle.getText();
            expect(titleText).toContain('Technical Tester');
        });

        it('should have navigation links', async () => {
            const expertiseLink = await HomePage.getElementByXPath('//a[@href="/expertise"]');
            const contactLink = await HomePage.getElementByXPath('//a[@href="/contact"]');
            
            expect(await expertiseLink.isExisting()).toBe(true);
            expect(await contactLink.isExisting()).toBe(true);
        });
    });
});