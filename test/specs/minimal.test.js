describe('Minimal Test', () => {
    it('should open home page and check title', async () => {
        await browser.url('http://localhost:4000');
        
        // Wait for page to load
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            { timeout: 5000, timeoutMsg: 'Page did not load' }
        );
        
        const title = await browser.getTitle();
        console.log('Page title:', title);
        
        expect(title).toContain('Nicolaj Schweitz');
    });
});