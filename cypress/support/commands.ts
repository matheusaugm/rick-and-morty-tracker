/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

// Add TypeScript definitions for custom commands
// This must be declared before the commands to avoid type errors
declare namespace Cypress {
  interface Chainable {
    /**
     * Search for a character by name and submit the search form
     * @param name - Character name to search for
     */
    searchCharacter(name: string): Chainable<JQuery<HTMLElement>>;
    
    /**
     * Change the application language
     * @param language - Language code to switch to
     */
    changeLanguage(language: 'en' | 'pt'): Chainable<JQuery<HTMLElement>>;
    
    /**
     * Toggle between light and dark themes
     */
    toggleTheme(): Chainable<JQuery<HTMLElement>>;
    
    /**
     * Open a character's detail modal
     * @param characterName - The character name to search for and click
     */
    openCharacterDetails(characterName: string): Chainable<JQuery<HTMLElement>>;
    
    /**
     * Navigate to a specific page number
     * @param pageNumber - The page number to navigate to
     */
    goToPage(pageNumber: number): Chainable<JQuery<HTMLElement>>;
    
    /**
     * Assert the current theme
     * @param theme - The expected theme ('light' or 'dark')
     */
    assertTheme(theme: 'light' | 'dark'): Chainable<JQuery<HTMLElement>>;

    /**
     * Debug by logging all elements with data-testid attributes
     */
    debugTestIds(): Chainable<JQuery<HTMLElement>>;
  }
}

// Custom commands for Rick and Morty application

// Search for a character
Cypress.Commands.add('searchCharacter', (name: string) => {
  cy.get('[data-testid="search-input"]').clear().type(name);
  cy.get('[data-testid="search-button"]').click();
});

// Change language
Cypress.Commands.add('changeLanguage', (language: 'en' | 'pt') => {
  cy.get(`[data-testid="lang-${language}"]`).click();
});

// Toggle theme
Cypress.Commands.add('toggleTheme', () => {
  cy.get('[data-testid="theme-toggle"]').click();
});

// Open character details
Cypress.Commands.add('openCharacterDetails', (characterName: string) => {
  cy.contains(characterName).click();
});

// Navigate to page
Cypress.Commands.add('goToPage', (pageNumber: number) => {
  cy.get(`[data-testid="page-button-${pageNumber}"]`).click();
});

// Assert theme
Cypress.Commands.add('assertTheme', (theme: 'light' | 'dark') => {
  if (theme === 'dark') {
    cy.get('html').should('have.class', 'dark');
  } else {
    cy.get('html').should('not.have.class', 'dark');
  }
});

// Debug test IDs
Cypress.Commands.add('debugTestIds', () => {
  cy.log('Finding all elements with data-testid attributes');
  
  // Use JavaScript to find and log all elements with data-testid
  cy.document().then(document => {
    const elements = document.querySelectorAll('[data-testid]');
    const testIds = Array.from(elements).map(el => el.getAttribute('data-testid'));
    
    cy.log(`Found ${testIds.length} elements with data-testid`);
    cy.log('Test IDs found: ' + JSON.stringify(testIds));

    // Alternative approach - check for pagination elements using various selectors
    cy.log('Checking for pagination elements');
    
    // Look for elements containing "Page" text
    const pageElements = document.querySelectorAll('*');
    const pageTextElements = Array.from(pageElements).filter(el => 
      el.textContent && el.textContent.match(/page/i));
    
    cy.log(`Found ${pageTextElements.length} elements with "page" text`);
    cy.log('First 5 elements:');
    
    pageTextElements.slice(0, 5).forEach(el => {
      cy.log(`Element: ${el.tagName}, Text: "${el.textContent?.trim()}", Classes: ${el.className}`);
    });
  });
}); 