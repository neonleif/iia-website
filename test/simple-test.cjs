// Simple test to validate the built site structure
const fs = require('fs');
const path = require('path');

console.log('🧪 Running simple site validation tests...\n');

const distPath = path.join(__dirname, '..', 'dist');

// Test 1: Check if build output exists
console.log('✅ Test 1: Build output validation');
if (!fs.existsSync(distPath)) {
    console.error('❌ Build output directory does not exist');
    process.exit(1);
}

const indexPath = path.join(distPath, 'index.html');
const contactPath = path.join(distPath, 'contact', 'index.html');
const expertisePath = path.join(distPath, 'expertise', 'index.html');

const pages = [
    { path: indexPath, name: 'Home page (index.html)' },
    { path: contactPath, name: 'Contact page' },
    { path: expertisePath, name: 'Expertise page' }
];

pages.forEach(({ path: pagePath, name }) => {
    if (fs.existsSync(pagePath)) {
        console.log(`   ✅ ${name} exists`);
    } else {
        console.error(`   ❌ ${name} missing at ${pagePath}`);
        process.exit(1);
    }
});

// Test 2: Content validation
console.log('\n✅ Test 2: Content validation');

pages.forEach(({ path: pagePath, name }) => {
    const content = fs.readFileSync(pagePath, 'utf8');
    
    // Basic HTML structure
    if (content.includes('<html') && content.includes('</html>')) {
        console.log(`   ✅ ${name} has valid HTML structure`);
    } else {
        console.error(`   ❌ ${name} has invalid HTML structure`);
        process.exit(1);
    }
    
    // Check for Nicolaj Schweitz branding
    if (content.includes('Nicolaj Schweitz')) {
        console.log(`   ✅ ${name} contains branding`);
    } else {
        console.error(`   ❌ ${name} missing branding`);
        process.exit(1);
    }
});

// Test 3: Specific page content validation
console.log('\n✅ Test 3: Page-specific content validation');

// Home page specific tests
const homeContent = fs.readFileSync(indexPath, 'utf8');
const homeKeywords = [
    'Technical Tester',
    'Test Automation Expert',
    'Unity',
    'Nets',
    'Laerdal'
];

homeKeywords.forEach(keyword => {
    if (homeContent.includes(keyword)) {
        console.log(`   ✅ Home page contains "${keyword}"`);
    } else {
        console.error(`   ❌ Home page missing "${keyword}"`);
        process.exit(1);
    }
});

// Contact page specific tests
const contactContent = fs.readFileSync(contactPath, 'utf8');
const contactKeywords = [
    'Let\'s Start a Conversation',
    'contact-form',
    'firstName',
    'lastName',
    'email',
    'message',
    'formspree.io'
];

contactKeywords.forEach(keyword => {
    if (contactContent.includes(keyword)) {
        console.log(`   ✅ Contact page contains "${keyword}"`);
    } else {
        console.error(`   ❌ Contact page missing "${keyword}"`);
        process.exit(1);
    }
});

// Expertise page specific tests
const expertiseContent = fs.readFileSync(expertisePath, 'utf8');
const expertiseKeywords = [
    'Technical Expertise',
    'Core Competencies',
    'Test Automation',
    'Selenium WebDriver',
    'ISTQB Foundation',
    'Certified Agile Tester',
    'AI-Enhanced Testing'
];

expertiseKeywords.forEach(keyword => {
    if (expertiseContent.includes(keyword)) {
        console.log(`   ✅ Expertise page contains "${keyword}"`);
    } else {
        console.error(`   ❌ Expertise page missing "${keyword}"`);
        process.exit(1);
    }
});

// Test 4: Form validation
console.log('\n✅ Test 4: Contact form validation');

const formChecks = [
    { pattern: /id="firstName"/, name: 'First name field' },
    { pattern: /id="lastName"/, name: 'Last name field' },
    { pattern: /id="email"/, name: 'Email field' },
    { pattern: /id="company"/, name: 'Company field' },
    { pattern: /id="projectType"/, name: 'Project type field' },
    { pattern: /id="timeline"/, name: 'Timeline field' },
    { pattern: /id="message"/, name: 'Message field' },
    { pattern: /id="submit-button"/, name: 'Submit button' },
    { pattern: /required/, name: 'Required field validation' },
    { pattern: /type="email"/, name: 'Email type validation' }
];

formChecks.forEach(({ pattern, name }) => {
    if (pattern.test(contactContent)) {
        console.log(`   ✅ ${name} present`);
    } else {
        console.error(`   ❌ ${name} missing`);
        process.exit(1);
    }
});

// Test 5: Navigation links validation
console.log('\n✅ Test 5: Navigation links validation');

const linkChecks = [
    { content: homeContent, page: 'Home', pattern: /href="\/contact"/, name: 'Contact page link' },
    { content: homeContent, page: 'Home', pattern: /href="mailto:nico@isitautomated.com"/, name: 'Email link' },
    { content: homeContent, page: 'Home', pattern: /href="https:\/\/linkedin.com\/in\/schweitz"/, name: 'LinkedIn link' },
    { content: contactContent, page: 'Contact', pattern: /href="https:\/\/linkedin.com\/in\/schweitz"/, name: 'LinkedIn link' },
    { content: expertiseContent, page: 'Expertise', pattern: /href="\/contact"/, name: 'Contact page link' },
    { content: expertiseContent, page: 'Expertise', pattern: /href="mailto:nico@isitautomated.com"/, name: 'Email link' }
];

linkChecks.forEach(({ content, page, pattern, name }) => {
    if (pattern.test(content)) {
        console.log(`   ✅ ${page} page has ${name}`);
    } else {
        console.error(`   ❌ ${page} page missing ${name}`);
        process.exit(1);
    }
});

console.log('\n🎉 All tests passed! The website structure and content are valid.\n');
console.log('📝 Test Summary:');
console.log('   - Build output validation: ✅');
console.log('   - HTML structure validation: ✅');
console.log('   - Branding consistency: ✅');
console.log('   - Page-specific content: ✅');
console.log('   - Contact form structure: ✅');
console.log('   - Navigation links: ✅');
console.log('\n🚀 Ready for manual testing with the full WDIO suite!');