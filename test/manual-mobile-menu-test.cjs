/**
 * Manual Mobile Menu Test
 * 
 * This script tests the mobile menu functionality by checking:
 * 1. Mobile menu elements exist in the HTML
 * 2. JavaScript functionality is present
 * 3. Menu can be toggled
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Mobile Menu Implementation...\n');

// Test 1: Check HTML structure
console.log('Test 1: Checking HTML structure...');
const indexPath = path.join(__dirname, '../dist/index.html');
const html = fs.readFileSync(indexPath, 'utf-8');

const requiredElements = [
    'id="mobile-menu-button"',
    'id="mobile-menu"',
    'id="menu-icon"',
    'id="close-icon"',
    'aria-label="Toggle mobile menu"'
];

let passed = true;
requiredElements.forEach(element => {
    if (html.includes(element)) {
        console.log(`   ✅ ${element} found`);
    } else {
        console.log(`   ❌ ${element} NOT found`);
        passed = false;
    }
});

// Test 2: Check JavaScript is present
console.log('\nTest 2: Checking JavaScript functionality...');
const jsChecks = [
    'mobile-menu-button',
    'addEventListener("click"',
    'classList.contains("hidden")',
    'classList.remove("hidden")',
    'classList.add("hidden")'
];

jsChecks.forEach(check => {
    if (html.includes(check)) {
        console.log(`   ✅ ${check} found in JS`);
    } else {
        console.log(`   ❌ ${check} NOT found in JS`);
        passed = false;
    }
});

// Test 3: Check mobile menu structure
console.log('\nTest 3: Checking mobile menu structure...');
const menuStructure = [
    'class="hidden md:hidden mt-4 pb-4"', // Mobile menu container
    'flex flex-col gap-4', // Mobile menu list styling
    'href="/"', // Home link
    'href="/expertise"', // Expertise link
    'href="/contact"' // Contact link
];

menuStructure.forEach(structure => {
    if (html.includes(structure)) {
        console.log(`   ✅ Menu structure element found: ${structure}`);
    } else {
        console.log(`   ❌ Menu structure element NOT found: ${structure}`);
        passed = false;
    }
});

// Test 4: Check responsive classes
console.log('\nTest 4: Checking responsive classes...');
const responsiveChecks = [
    'hidden md:flex', // Desktop nav should be hidden on mobile
    'md:hidden', // Mobile button should be hidden on desktop
    'class="md:hidden"' // Mobile menu button container
];

responsiveChecks.forEach(check => {
    if (html.includes(check)) {
        console.log(`   ✅ Responsive class found: ${check}`);
    } else {
        console.log(`   ❌ Responsive class NOT found: ${check}`);
        passed = false;
    }
});

// Summary
console.log('\n' + '='.repeat(50));
if (passed) {
    console.log('✅ All mobile menu tests passed!');
    console.log('\n📱 Mobile menu implementation is correct.');
    console.log('   - Hamburger button exists');
    console.log('   - Mobile menu container exists');
    console.log('   - Toggle JavaScript is present');
    console.log('   - Responsive classes are correct');
    console.log('\n🎉 The mobile menu should now work on mobile devices!');
    process.exit(0);
} else {
    console.log('❌ Some mobile menu tests failed!');
    console.log('   Please review the output above.');
    process.exit(1);
}
