import { remote } from 'webdriverio';
import { expect } from 'chai';
import wdioConfig from '../wdio.simple.conf.js';

// Global browser instance for Test Explorer
let browserInstance;

// Setup browser before tests
before(async function() {
    this.timeout(30000);

    browserInstance = await remote({
        ...wdioConfig,
        logLevel: wdioConfig.logLevel || 'warn'
    });

    // Make browser globally available
    global.browser = browserInstance;
    global.$ = browserInstance.$;
    global.$$ = browserInstance.$$;
});

// Cleanup after all tests
after(async function() {
    if (browserInstance) {
        await browserInstance.deleteSession();
    }
});

// Make expect globally available
global.expect = expect;