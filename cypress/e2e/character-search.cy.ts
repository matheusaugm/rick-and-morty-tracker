describe('Character Search', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for initial data to load
    cy.contains('Rick and Morty', { timeout: 10000 });
  });

  it('should display characters on initial load', () => {
    // Verify that character cards are displayed
    cy.get('[data-testid="character-card"]').should('have.length.at.least', 1);
  });

  it('should search for a character and display results', () => {
    // Search for Rick
    cy.searchCharacter('Rick');
    
    // Verify search results
    cy.get('[data-testid="character-card"]').should('have.length.at.least', 1);
    cy.contains('Rick').should('be.visible');
  });

  it('should show error message when no characters found', () => {
    // Search for a character that doesn't exist
    cy.searchCharacter('XYZNonExistentCharacter123');
    
    // Verify no results message
    cy.get('[data-testid="no-characters-message"]').should('be.visible');
  });

  it('should open character details modal when clicking a character', () => {
    // Wait for characters to load
    cy.get('[data-testid="character-card"]').first().as('firstCharacter');
    
    // Get the character name
    cy.get('@firstCharacter').find('h3').invoke('text').then((characterName) => {
      // Click on the character
      cy.get('@firstCharacter').click();
      
      // Verify modal is open with character details
      cy.get('[data-testid="character-modal"]').should('be.visible');
      cy.get('[data-testid="character-modal"]').contains(characterName);
      
      // Close the modal
      cy.get('button[aria-label="Close"]').click();
      
      // Verify modal is closed
      cy.get('[data-testid="character-modal"]').should('not.exist');
    });
  });
}); 