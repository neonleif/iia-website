export const config = {
    // WebDriverIO Configuration
    runner: 'local',
    
    // Test specs
    specs: [
        './test/specs/**/*.js'
    ],
    
    // Test patterns to exclude
    exclude: [],
    
    // Capabilities - Using system Chrome
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--headless',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-web-security',
                '--allow-running-insecure-content',
                '--window-size=1920,1080',
                '--disable-extensions',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding'
            ],
            binary: '/usr/bin/google-chrome-stable'
        }
    }],
    
    // Test configuration
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:4000',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    
    // Services
    services: [
        ['static-server', {
            folders: [{
                mount: '/',
                path: './dist'
            }],
            port: 4000
        }],
        ['selenium-standalone', {
            logPath: 'logs',
            installArgs: {
                drivers: {
                    chrome: { version: '114.0.5735.90' },
                }
            },
            args: {
                drivers: {
                    chrome: { version: '114.0.5735.90' },
                }
            }
        }]
    ],
    
    // Framework
    framework: 'mocha',
    reporters: ['spec'],
    
    // Mocha options
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    // Hooks
    onPrepare: function (config, capabilities) {
        console.log('Starting WebDriverIO tests...');
    },
    
    onComplete: function(exitCode) {
        console.log('All tests completed. Exit code:', exitCode);
    },
    
    beforeSession: function (config, capabilities, specs) {
        console.log('Starting new session...');
    },
    
    before: function (capabilities, specs) {
        // Set up global test utilities
        global.expect = require('expect');
    }
};