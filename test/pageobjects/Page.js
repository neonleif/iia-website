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

    async waitForElement(selector, timeout = 10000) {
        const element = await $(selector);
        await element.waitForExist({ timeout });
        return element;
    }

    async waitForClickable(selector, timeout = 10000) {
        const element = await $(selector);
        await element.waitForClickable({ timeout });
        return element;
    }

    async getElementByXPath(xpath) {
        return await $(xpath);
    }

    async waitForElementByXPath(xpath, timeout = 10000) {
        const element = await $(xpath);
        await element.waitForExist({ timeout });
        return element;
    }

    async elementExists(selector) {
        const element = await $(selector);
        return await element.isExisting();
    }

    async getTitle() {
        return await browser.getTitle();
    }

    async getCurrentUrl() {
        return await browser.getUrl();
    }

    /**
     * Waits for document.readyState to be complete
     */
    async waitForPageLoad(timeout = 10000) {
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            { timeout, timeoutMsg: 'Page did not load within timeout' }
        );
    }

    async scrollToElement(selector) {
        const element = await $(selector);
        await element.scrollIntoView();
        return element;
    }
}