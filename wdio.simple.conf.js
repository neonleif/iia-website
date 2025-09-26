export const config = {
    // WebDriverIO Configuration for CI environment
    runner: 'local',
    
    // Test specs
    specs: [
        './test/specs/**/*.js'
    ],
    
    // Test patterns to exclude
    exclude: [],
    
    // Capabilities - Using system Firefox (more reliable in CI)
    capabilities: [{
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: [
                '--headless',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--width=1920',
                '--height=1080'
            ]
        }
    }],
    
    // Test configuration
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:4000',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    
    // Only use static server service to avoid driver download issues
    services: [
        ['static-server', {
            folders: [{
                mount: '/',
                path: './dist'
            }],
            port: 4000
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
        console.log('Starting WebDriverIO tests with Firefox...');
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