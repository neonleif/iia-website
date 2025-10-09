import { expect } from 'chai';

// Make expect globally available for Test Explorer
global.expect = expect;

// Configure test timeout for Test Explorer
export const mochaHooks = {
    beforeAll() {
        console.log('🚀 Starting Test Explorer Tests');
    },
    
    afterAll() {
        console.log('✅ Test Explorer Tests Completed');
    }
};