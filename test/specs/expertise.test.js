import ExpertisePage from '../pageobjects/ExpertisePage.js';

describe('Expertise Page Tests', () => {
    beforeEach(async () => {
        await ExpertisePage.open();
    });

    describe('Page Structure and Content', () => {
        it('should display the correct page title', async () => {
            const title = await ExpertisePage.getTitle();
            expect(title).toContain('Expertise');
            expect(title).toContain('Nicolaj Schweitz');
        });

        it('should display page header with title and subtitle', async () => {
            const pageTitle = await ExpertisePage.getPageTitle();
            expect(await pageTitle.isDisplayed()).toBe(true);
            
            const titleText = await pageTitle.getText();
            expect(titleText).toBe('Technical Expertise');
        });

        it('should verify all main sections are present', async () => {
            const pageStructure = await ExpertisePage.verifyPageStructure();
            
            expect(pageStructure.hasCoreCompetencies).toBe(true);
            expect(pageStructure.hasMethodologies).toBe(true);
            expect(pageStructure.hasIndustryExperience).toBe(true);
            expect(pageStructure.hasCertifications).toBe(true);
            expect(pageStructure.hasAISection).toBe(true);
            expect(pageStructure.hasTechnologyIcons).toBe(true);
        });
    });

    describe('Core Competencies Section', () => {
        it('should display Core Competencies heading', async () => {
            const heading = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.coreCompetenciesHeading);
            expect(await heading.isDisplayed()).toBe(true);
            expect(await heading.getText()).toBe('Core Competencies');
        });

        it('should display all core competency cards', async () => {
            const coreCompetenciesPresent = await ExpertisePage.areCoreCompetenciesPresent();
            expect(coreCompetenciesPresent).toBe(true);
        });

        it('should display Test Automation card with correct content', async () => {
            const testAutomationCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.testAutomationCard);
            expect(await testAutomationCard.isDisplayed()).toBe(true);
            expect(await testAutomationCard.getText()).toBe('Test Automation');
        });

        it('should display Technical Testing card', async () => {
            const technicalTestingCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.technicalTestingCard);
            expect(await technicalTestingCard.isDisplayed()).toBe(true);
            expect(await technicalTestingCard.getText()).toBe('Technical Testing');
        });

        it('should display Agile & Coaching card', async () => {
            const agileCoachingCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.agileCoachingCard);
            expect(await agileCoachingCard.isDisplayed()).toBe(true);
            expect(await agileCoachingCard.getText()).toBe('Agile & Coaching');
        });

        it('should display Tools & Technologies card', async () => {
            const toolsTechCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.toolsTechnologiesCard);
            expect(await toolsTechCard.isDisplayed()).toBe(true);
            expect(await toolsTechCard.getText()).toBe('Tools & Technologies');
        });
    });

    describe('Testing Methodologies Section', () => {
        it('should display methodologies heading', async () => {
            const heading = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.methodologiesHeading);
            expect(await heading.isDisplayed()).toBe(true);
            expect(await heading.getText()).toBe('Testing Methodologies & Tools');
        });

        it('should display all methodology cards', async () => {
            const methodologiesPresent = await ExpertisePage.areMethodologiesPresent();
            expect(methodologiesPresent).toBe(true);
        });

        it('should display Testing Methods card', async () => {
            const testingMethodsCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.testingMethodsCard);
            expect(await testingMethodsCard.isDisplayed()).toBe(true);
            expect(await testingMethodsCard.getText()).toBe('Testing Methods');
        });

        it('should display Development & IDEs card', async () => {
            const developmentIDEsCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.developmentIDEsCard);
            expect(await developmentIDEsCard.isDisplayed()).toBe(true);
            expect(await developmentIDEsCard.getText()).toBe('Development & IDEs');
        });

        it('should display Test Frameworks card', async () => {
            const testFrameworksCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.testFrameworksCard);
            expect(await testFrameworksCard.isDisplayed()).toBe(true);
            expect(await testFrameworksCard.getText()).toBe('Test Frameworks');
        });

        it('should display API & Integration card', async () => {
            const apiIntegrationCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.apiIntegrationCard);
            expect(await apiIntegrationCard.isDisplayed()).toBe(true);
            expect(await apiIntegrationCard.getText()).toBe('API & Integration');
        });

        it('should display CI/CD & DevOps card', async () => {
            const cicdDevOpsCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.cicdDevOpsCard);
            expect(await cicdDevOpsCard.isDisplayed()).toBe(true);
            expect(await cicdDevOpsCard.getText()).toBe('CI/CD & DevOps');
        });

        it('should display Collaboration Tools card', async () => {
            const collaborationToolsCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.collaborationToolsCard);
            expect(await collaborationToolsCard.isDisplayed()).toBe(true);
            expect(await collaborationToolsCard.getText()).toBe('Collaboration Tools');
        });
    });

    describe('AI Enhanced Testing Section', () => {
        it('should display AI section heading', async () => {
            const aiHeading = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.aiHeading);
            expect(await aiHeading.isDisplayed()).toBe(true);
            expect(await aiHeading.getText()).toBe('AI-Enhanced Testing & Development');
        });

        it('should display AI section content', async () => {
            const aiSectionPresent = await ExpertisePage.isAISectionPresent();
            expect(aiSectionPresent).toBe(true);
        });

        it('should display AI Platforms & Tools card', async () => {
            const aiPlatformsCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.aiPlatformsCard);
            expect(await aiPlatformsCard.isDisplayed()).toBe(true);
            expect(await aiPlatformsCard.getText()).toBe('AI Platforms & Tools');
        });

        it('should display AI Applications card', async () => {
            const aiApplicationsCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.aiApplicationsCard);
            expect(await aiApplicationsCard.isDisplayed()).toBe(true);
            expect(await aiApplicationsCard.getText()).toBe('AI Applications in Testing');
        });

        it('should display compliance information', async () => {
            const complianceHeading = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.complianceHeading);
            expect(await complianceHeading.isDisplayed()).toBe(true);
            expect(await complianceHeading.getText()).toBe('Compliance-First AI Usage');
        });
    });

    describe('Industry Experience Section', () => {
        it('should display industry experience heading', async () => {
            const industryHeading = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.industryHeading);
            expect(await industryHeading.isDisplayed()).toBe(true);
            expect(await industryHeading.getText()).toBe('Industry Experience');
        });

        it('should display all industry experience cards', async () => {
            const industryExperiencePresent = await ExpertisePage.isIndustryExperiencePresent();
            expect(industryExperiencePresent).toBe(true);
        });

        it('should display Financial Services card', async () => {
            const financialServicesCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.financialServicesCard);
            expect(await financialServicesCard.isDisplayed()).toBe(true);
            expect(await financialServicesCard.getText()).toBe('Financial Services');
        });

        it('should display Healthcare card', async () => {
            const healthcareCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.healthcareCard);
            expect(await healthcareCard.isDisplayed()).toBe(true);
            expect(await healthcareCard.getText()).toBe('Healthcare');
        });

        it('should display Gaming & Tech card', async () => {
            const gamingTechCard = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.gamingTechCard);
            expect(await gamingTechCard.isDisplayed()).toBe(true);
            expect(await gamingTechCard.getText()).toBe('Gaming & Tech');
        });
    });

    describe('Certifications Section', () => {
        it('should display certifications heading', async () => {
            const certificationsHeading = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.certificationsHeading);
            expect(await certificationsHeading.isDisplayed()).toBe(true);
            expect(await certificationsHeading.getText()).toBe('Certifications & Education');
        });

        it('should display certifications', async () => {
            const certificationsPresent = await ExpertisePage.areCertificationsPresent();
            expect(certificationsPresent).toBe(true);
        });

        it('should display CAT certification', async () => {
            const catCertification = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.catCertification);
            expect(await catCertification.isDisplayed()).toBe(true);
            expect(await catCertification.getText()).toBe('Certified Agile Tester (CAT)');
        });

        it('should display ISTQB certification', async () => {
            const istqbCertification = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.istqbCertification);
            expect(await istqbCertification.isDisplayed()).toBe(true);
            expect(await istqbCertification.getText()).toBe('ISTQB Foundation');
        });

        it('should display MSc education', async () => {
            const mscEducation = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.mscEducation);
            expect(await mscEducation.isDisplayed()).toBe(true);
            expect(await mscEducation.getText()).toBe('MSc in Medialogy');
        });

        it('should display Multimedia Designer education', async () => {
            const multimediaDesignerEducation = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.multimediaDesignerEducation);
            expect(await multimediaDesignerEducation.isDisplayed()).toBe(true);
            expect(await multimediaDesignerEducation.getText()).toBe('Multimedia Designer');
        });
    });

    describe('Technology Icons Section', () => {
        it('should display technology icons', async () => {
            const technologyIconsPresent = await ExpertisePage.areTechnologyIconsPresent();
            expect(technologyIconsPresent).toBe(true);
        });

        it('should display C# technology icon', async () => {
            const csharpIcon = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.csharpIcon);
            expect(await csharpIcon.isDisplayed()).toBe(true);
            expect(await csharpIcon.getText()).toBe('C#');
        });

        it('should display Java technology icon', async () => {
            const javaIcon = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.javaIcon);
            expect(await javaIcon.isDisplayed()).toBe(true);
            expect(await javaIcon.getText()).toBe('Java');
        });

        it('should display Selenium technology icon', async () => {
            const seleniumIcon = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.seleniumIcon);
            expect(await seleniumIcon.isDisplayed()).toBe(true);
            expect(await seleniumIcon.getText()).toBe('Selenium');
        });

        it('should display Postman technology icon', async () => {
            const postmanIcon = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.postmanIcon);
            expect(await postmanIcon.isDisplayed()).toBe(true);
            expect(await postmanIcon.getText()).toBe('Postman');
        });
    });

    describe('Call to Action Section', () => {
        it('should display call to action heading', async () => {
            const ctaHeading = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.ctaHeading);
            expect(await ctaHeading.isDisplayed()).toBe(true);
            expect(await ctaHeading.getText()).toContain('Let\'s Discuss Your Testing Challenges');
        });

        it('should navigate to contact page when Get In Touch button is clicked', async () => {
            await ExpertisePage.clickGetInTouchButton();
            
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes('/contact'),
                { timeout: 5000, timeoutMsg: 'Expected to navigate to contact page' }
            );
            
            const currentUrl = await browser.getUrl();
            expect(currentUrl).toContain('/contact');
        });

        it('should have correct href for email directly button', async () => {
            const emailButton = await ExpertisePage.getElementByXPath(ExpertisePage.selectors.emailDirectlyButton);
            const href = await emailButton.getAttribute('href');
            
            expect(href).toContain('mailto:nico@isitautomated.com');
        });
    });

    describe('Text Content Validation', () => {
        it('should contain key technical expertise keywords', async () => {
            const pageSource = await browser.getPageSource();
            
            const keywords = [
                'Technical Expertise',
                'Core Competencies',
                'Test Automation',
                'Selenium WebDriver',
                'Postman',
                'SoapUI',
                'Cucumber',
                'BDD',
                'Agile',
                'ISTQB',
                'Certified Agile Tester',
                'Financial Services',
                'Healthcare',
                'Gaming',
                'AI-Enhanced Testing',
                'ChatGPT',
                'GitHub Copilot'
            ];
            
            keywords.forEach(keyword => {
                expect(pageSource).toContain(keyword);
            });
        });

        it('should contain industry client names', async () => {
            const pageSource = await browser.getPageSource();
            
            const clients = [
                'Nordea',
                'Nets',
                'Unity Technologies',
                'Novo Nordisk',
                'Laerdal'
            ];
            
            clients.forEach(client => {
                expect(pageSource).toContain(client);
            });
        });
    });

    describe('Responsive Design', () => {
        it('should be responsive on mobile viewport', async () => {
            await browser.setWindowSize(375, 667);
            
            const pageTitle = await ExpertisePage.getPageTitle();
            expect(await pageTitle.isDisplayed()).toBe(true);
            
            // Reset viewport
            await browser.setWindowSize(1920, 1080);
        });

        it('should maintain content structure on tablet viewport', async () => {
            await browser.setWindowSize(768, 1024);
            
            const coreCompetenciesPresent = await ExpertisePage.areCoreCompetenciesPresent();
            expect(coreCompetenciesPresent).toBe(true);
            
            // Reset viewport
            await browser.setWindowSize(1920, 1080);
        });
    });
});