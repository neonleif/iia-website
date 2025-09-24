# E2E Test Suite for IIA Website

This test suite uses WebDriverIO with Mocha framework to test the IIA website end-to-end functionality.

## Test Structure

### Page Objects
- `Page.js` - Base page object with common utilities
- `HomePage.js` - Home page object model with XPath locators
- `ContactPage.js` - Contact page object model with form testing capabilities  
- `ExpertisePage.js` - Expertise page object model with content validation

### Test Specifications
- `home.test.js` - Tests for home page content, navigation, and responsiveness
- `contact.test.js` - Tests for contact form functionality, validation, and submission
- `expertise.test.js` - Tests for expertise page content and structure
- `navigation.test.js` - Cross-page navigation and consistency tests

## Test Coverage

### Contact Form Testing
- Form field validation (required fields, email format)
- Form submission functionality
- Success/error message handling
- Project type and timeline dropdown options
- Responsive form behavior

### Navigation Testing
- Inter-page navigation links
- External links (LinkedIn, email)
- URL structure validation
- Browser back/forward functionality

### Content Testing
- Page titles and headings
- Key technical keywords presence
- Client and company information
- Technology icons and certifications
- Responsive design across viewports

### Technical Testing
- Page load performance
- JavaScript error detection
- Cross-browser compatibility
- SEO meta information

## Running Tests

### Prerequisites
```bash
npm install
npm run build
```

### Run All Tests
```bash
npm run test:e2e
```

### Run Specific Test File
```bash
npm run test:e2e:specific test/specs/contact.test.js
```

### Watch Mode (for development)
```bash
npm run test:e2e:watch
```

## Configuration

Tests are configured in `wdio.conf.js`:
- Uses headless Chrome for CI/CD compatibility
- Static server serves the built site on port 4000
- 10 second timeout for element waits
- Mocha framework with expect assertions

## XPath Strategy

All page objects use XPath locators for precise element targeting:
- Text-based selectors for robust content validation
- Attribute-based selectors for form elements
- Hierarchical selectors for complex components

## Test Data

Tests use realistic test data:
- Valid email formats for form testing
- Proper names and company information
- Realistic project descriptions and timelines

## Reporting

Tests output detailed results using the WebDriverIO spec reporter, showing:
- Test execution time
- Pass/fail status for each test
- Detailed error messages for failures
- Browser console error detection