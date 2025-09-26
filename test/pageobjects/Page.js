/**
 * Base Page class for all page objects
 * Contains common methods and utilities used across all pages
 */
export default class Page {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path) {
        return browser.url(`http://localhost:4000${path}`);
    }

    /**
     * Wait for element to be present
     */
    async waitForElement(selector, timeout = 10000) {
        const element = await $(selector);
        await element.waitForExist({ timeout });
        return element;
    }

    /**
     * Wait for element to be clickable
     */
    async waitForClickable(selector, timeout = 10000) {
        const element = await $(selector);
        await element.waitForClickable({ timeout });
        return element;
    }

    /**
     * Get element by XPath
     */
    async getElementByXPath(xpath) {
        return await $(xpath);
    }

    /**
     * Wait for element by XPath
     */
    async waitForElementByXPath(xpath, timeout = 10000) {
        const element = await $(xpath);
        await element.waitForExist({ timeout });
        return element;
    }

    /**
     * Check if element exists
     */
    async elementExists(selector) {
        const element = await $(selector);
        return await element.isExisting();
    }

    /**
     * Get page title
     */
    async getTitle() {
        return await browser.getTitle();
    }

    /**
     * Get current URL
     */
    async getCurrentUrl() {
        return await browser.getUrl();
    }

    /**
     * Wait for page to load
     */
    async waitForPageLoad(timeout = 10000) {
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            { timeout, timeoutMsg: 'Page did not load within timeout' }
        );
    }

    /**
     * Scroll to element
     */
    async scrollToElement(selector) {
        const element = await $(selector);
        await element.scrollIntoView();
        return element;
    }
}