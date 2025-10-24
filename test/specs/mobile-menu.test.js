const HomePage = require('../pageobjects/HomePage');

describe('Mobile Menu Navigation', () => {
    beforeEach(async () => {
        await HomePage.open();
    });

    it('should display hamburger menu button on mobile viewport', async () => {
        // Set mobile viewport
        await browser.setWindowSize(375, 667); // iPhone SE size
        
        const mobileMenuButton = await $('#mobile-menu-button');
        await expect(mobileMenuButton).toBeDisplayed();
    });

    it('should hide desktop navigation on mobile viewport', async () => {
        await browser.setWindowSize(375, 667);
        
        const desktopNav = await $('ul.hidden.md\\:flex');
        await expect(desktopNav).not.toBeDisplayedInViewport();
    });

    it('should toggle mobile menu when hamburger button is clicked', async () => {
        await browser.setWindowSize(375, 667);
        
        const mobileMenuButton = await $('#mobile-menu-button');
        const mobileMenu = await $('#mobile-menu');
        
        // Mobile menu should be hidden initially
        const hasHiddenClass = await mobileMenu.getAttribute('class');
        expect(hasHiddenClass).toContain('hidden');
        
        // Click hamburger button
        await mobileMenuButton.click();
        await browser.pause(100); // Small pause for animation
        
        // Mobile menu should now be visible (no hidden class)
        const updatedClass = await mobileMenu.getAttribute('class');
        expect(updatedClass).not.toContain('hidden');
    });

    it('should show close icon when menu is open', async () => {
        await browser.setWindowSize(375, 667);
        
        const mobileMenuButton = await $('#mobile-menu-button');
        const menuIcon = await $('#menu-icon');
        const closeIcon = await $('#close-icon');
        
        // Initially menu icon should be visible, close icon hidden
        const menuIconClass = await menuIcon.getAttribute('class');
        const closeIconClass = await closeIcon.getAttribute('class');
        expect(menuIconClass).not.toContain('hidden');
        expect(closeIconClass).toContain('hidden');
        
        // Click to open menu
        await mobileMenuButton.click();
        await browser.pause(100);
        
        // Now close icon should be visible, menu icon hidden
        const updatedMenuIconClass = await menuIcon.getAttribute('class');
        const updatedCloseIconClass = await closeIcon.getAttribute('class');
        expect(updatedMenuIconClass).toContain('hidden');
        expect(updatedCloseIconClass).not.toContain('hidden');
    });

    it('should navigate to pages from mobile menu', async () => {
        await browser.setWindowSize(375, 667);
        
        const mobileMenuButton = await $('#mobile-menu-button');
        await mobileMenuButton.click();
        await browser.pause(100);
        
        const mobileMenu = await $('#mobile-menu');
        
        // Click Expertise link in mobile menu
        const expertiseLink = await mobileMenu.$('a[href="/expertise"]');
        await expertiseLink.click();
        
        // Should navigate to expertise page
        await expect(browser).toHaveUrl(expect.stringContaining('/expertise'));
    });

    it('should show desktop menu on desktop viewport', async () => {
        await browser.setWindowSize(1280, 800);
        
        const desktopNav = await $('ul.hidden.md\\:flex');
        await expect(desktopNav).toBeDisplayedInViewport();
        
        const mobileMenuButton = await $('#mobile-menu-button');
        await expect(mobileMenuButton).not.toBeDisplayedInViewport();
    });
});
