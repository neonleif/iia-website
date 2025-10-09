import { expect } from 'chai';

describe('Simple Test Suite', () => {
    describe('Basic Tests', () => {
        it('should pass a simple test', () => {
            expect(1 + 1).to.equal(2);
        });

        it('should validate string contains', () => {
            const title = 'Nicolaj Schweitz - Technical Tester';
            expect(title).to.contain('Nicolaj Schweitz');
        });

        it('should check array length', () => {
            const skills = ['Testing', 'Automation', 'Quality Assurance'];
            expect(skills).to.have.length(3);
        });
    });

    describe('Object Tests', () => {
        it('should validate object properties', () => {
            const person = {
                name: 'Nicolaj Schweitz',
                role: 'Technical Tester',
                skills: ['C#', 'Java', 'Selenium']
            };
            
            expect(person).to.have.property('name');
            expect(person.role).to.equal('Technical Tester');
            expect(person.skills).to.include('Selenium');
        });
    });
});