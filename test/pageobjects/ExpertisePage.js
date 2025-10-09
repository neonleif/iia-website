import Page from './Page.js';

/**
 * Expertise page object model
 */
class ExpertisePage extends Page {
    /**
     * XPath locators for expertise page elements
     */
    get selectors() {
        return {
            // Header
            pageTitle: '//h1[contains(text(), "Technical Expertise")]',
            pageSubtitle: '//p[contains(text(), "Deep technical knowledge")]',
            
            // Core Competencies section
            coreCompetenciesHeading: '//h2[text()="Core Competencies"]',
            testAutomationCard: '//h3[text()="Test Automation"]',
            technicalTestingCard: '//h3[text()="Technical Testing"]',
            agileCoachingCard: '//h3[text()="Agile & Coaching"]',
            toolsTechnologiesCard: '//h3[text()="Tools & Technologies"]',
            
            // Testing Methodologies section
            methodologiesHeading: '//h2[text()="Testing Methodologies & Tools"]',
            testingMethodsCard: '//h3[text()="Testing Methods"]',
            developmentIDEsCard: '//h3[text()="Development & IDEs"]',
            testFrameworksCard: '//h3[text()="Test Frameworks"]',
            apiIntegrationCard: '//h3[text()="API & Integration"]',
            cicdDevOpsCard: '//h3[text()="CI/CD & DevOps"]',
            collaborationToolsCard: '//h3[text()="Collaboration Tools"]',
            
            // Tools & Technologies section
            toolsHeading: '//h2[text()="Tools & Technologies"]',
            
            // AI Enhanced Testing section
            aiHeading: '//h2[text()="AI-Enhanced Testing & Development"]',
            aiPlatformsCard: '//h3[text()="AI Platforms & Tools"]',
            aiApplicationsCard: '//h3[text()="AI Applications in Testing"]',
            complianceHeading: '//h3[text()="Compliance-First AI Usage"]',
            
            // Industry Experience section
            industryHeading: '//h2[text()="Industry Experience"]',
            financialServicesCard: '//h3[text()="Financial Services"]',
            healthcareCard: '//h3[text()="Healthcare"]',
            gamingTechCard: '//h3[text()="Gaming & Tech"]',
            
            // Certifications section
            certificationsHeading: '//h2[text()="Certifications & Education"]',
            catCertification: '//h4[text()="Certified Agile Tester (CAT)"]',
            istqbCertification: '//h4[text()="ISTQB Foundation"]',
            mscEducation: '//h4[text()="MSc in Medialogy"]',
            multimediaDesignerEducation: '//h4[text()="Multimedia Designer"]',
            
            // Call to action
            ctaHeading: '//h2[contains(text(), "Let\'s Discuss Your Testing Challenges")]',
            getInTouchButton: '//a[@href="/contact" and contains(text(), "Get In Touch")]',
            emailDirectlyButton: '//a[@href="mailto:nico@isitautomated.com" and contains(text(), "Email Directly")]',
            
            // Technology icons (sample - there are many more)
            csharpIcon: '//span[text()="C#"]',
            javaIcon: '//span[text()="Java"]',
            seleniumIcon: '//span[text()="Selenium"]',
            postmanIcon: '//span[text()="Postman"]'
        };
    }

    async open() {
        await super.open('/expertise');
        await this.waitForPageLoad();
    }

    async getPageTitle() {
        return await this.waitForElementByXPath(this.selectors.pageTitle);
    }

    async areCoreCompetenciesPresent() {
        const testAutomation = await this.getElementByXPath(this.selectors.testAutomationCard);
        const technicalTesting = await this.getElementByXPath(this.selectors.technicalTestingCard);
        const agileCoaching = await this.getElementByXPath(this.selectors.agileCoachingCard);
        const toolsTech = await this.getElementByXPath(this.selectors.toolsTechnologiesCard);
        
        return (await testAutomation.isExisting()) && 
               (await technicalTesting.isExisting()) && 
               (await agileCoaching.isExisting()) &&
               (await toolsTech.isExisting());
    }

    async areMethodologiesPresent() {
        const testingMethods = await this.getElementByXPath(this.selectors.testingMethodsCard);
        const developmentIDEs = await this.getElementByXPath(this.selectors.developmentIDEsCard);
        const testFrameworks = await this.getElementByXPath(this.selectors.testFrameworksCard);
        
        return (await testingMethods.isExisting()) && 
               (await developmentIDEs.isExisting()) && 
               (await testFrameworks.isExisting());
    }

    async isIndustryExperiencePresent() {
        const financial = await this.getElementByXPath(this.selectors.financialServicesCard);
        const healthcare = await this.getElementByXPath(this.selectors.healthcareCard);
        const gaming = await this.getElementByXPath(this.selectors.gamingTechCard);
        
        return (await financial.isExisting()) && 
               (await healthcare.isExisting()) && 
               (await gaming.isExisting());
    }

    async areCertificationsPresent() {
        const cat = await this.getElementByXPath(this.selectors.catCertification);
        const istqb = await this.getElementByXPath(this.selectors.istqbCertification);
        
        return (await cat.isExisting()) && (await istqb.isExisting());
    }

    async isAISectionPresent() {
        const aiHeading = await this.getElementByXPath(this.selectors.aiHeading);
        const aiPlatforms = await this.getElementByXPath(this.selectors.aiPlatformsCard);
        const aiApplications = await this.getElementByXPath(this.selectors.aiApplicationsCard);
        
        return (await aiHeading.isExisting()) && 
               (await aiPlatforms.isExisting()) && 
               (await aiApplications.isExisting());
    }

    async areTechnologyIconsPresent() {
        const csharp = await this.getElementByXPath(this.selectors.csharpIcon);
        const java = await this.getElementByXPath(this.selectors.javaIcon);
        const selenium = await this.getElementByXPath(this.selectors.seleniumIcon);
        
        return (await csharp.isExisting()) && 
               (await java.isExisting()) && 
               (await selenium.isExisting());
    }

    async clickGetInTouchButton() {
        const button = await this.waitForClickable(this.selectors.getInTouchButton);
        await button.click();
    }

    async clickEmailDirectlyButton() {
        const button = await this.waitForClickable(this.selectors.emailDirectlyButton);
        await button.click();
    }

    /**
     * Returns object with presence status of all major page sections
     */
    async verifyPageStructure() {
        const coreCompetencies = await this.areCoreCompetenciesPresent();
        const methodologies = await this.areMethodologiesPresent();
        const industryExperience = await this.isIndustryExperiencePresent();
        const certifications = await this.areCertificationsPresent();
        const aiSection = await this.isAISectionPresent();
        const technologyIcons = await this.areTechnologyIconsPresent();
        
        return {
            hasCoreCompetencies: coreCompetencies,
            hasMethodologies: methodologies,
            hasIndustryExperience: industryExperience,
            hasCertifications: certifications,
            hasAISection: aiSection,
            hasTechnologyIcons: technologyIcons
        };
    }
}

export default new ExpertisePage();