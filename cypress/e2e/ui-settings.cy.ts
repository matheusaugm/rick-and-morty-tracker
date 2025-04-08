describe('UI Settings', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for initial data to load
    cy.contains('Rick and Morty', { timeout: 10000 });
  });

  it('should toggle between light and dark themes', () => {
    // Start in light mode (default)
    cy.assertTheme('light');
    
    // Toggle to dark mode
    cy.toggleTheme();
    cy.assertTheme('dark');
    
    // Toggle back to light mode
    cy.toggleTheme();
    cy.assertTheme('light');
  });

  it('should switch between English and Portuguese languages', () => {
    // Start in English (default)
    cy.contains('Search').should('be.visible');
    
    // Switch to Portuguese
    cy.changeLanguage('pt');
    cy.contains('Buscar').should('be.visible');
    
    // Switch back to English
    cy.changeLanguage('en');
    cy.contains('Search').should('be.visible');
  });

  it('should persist theme preference', () => {
    // Toggle to dark mode
    cy.toggleTheme();
    cy.assertTheme('dark');
    
    // Reload the page
    cy.reload();
    
    // Theme should still be dark
    cy.assertTheme('dark');
    
    // Reset to light mode for other tests
    cy.toggleTheme();
  });

  it('should persist language preference', () => {
    // Switch to Portuguese
    cy.changeLanguage('pt');
    cy.contains('Buscar').should('be.visible');
    
    // Reload the page
    cy.reload();
    
    // Language should still be Portuguese
    cy.contains('Buscar').should('be.visible');
    
    // Reset to English for other tests
    cy.changeLanguage('en');
  });
}); 