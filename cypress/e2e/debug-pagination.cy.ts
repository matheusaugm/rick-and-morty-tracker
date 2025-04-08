describe('Debug Pagination', () => {
  it('should identify pagination elements', () => {
    cy.visit('/');
    
    // Wait for initial data to load
    cy.contains('Rick and Morty', { timeout: 10000 });
    
    // Wait for character data to load
    cy.get('[data-testid="character-card"]', { timeout: 10000 }).should('be.visible');
    
    // Log all data-testid elements
    cy.debugTestIds();
    
    // Take a screenshot
    cy.screenshot('initial-page-load');
    
    // Check for specific class names that might indicate pagination
    cy.document().then(document => {
      cy.log('Checking for pagination classes');
      
      const classesToCheck = [
        '.pagination', 
        '.pager', 
        '.paginator', 
        '.page-navigation'
      ];
      
      classesToCheck.forEach(className => {
        const elements = document.querySelectorAll(className);
        cy.log(`Found ${elements.length} elements with class ${className}`);
      });
      
      // Check for text that might indicate pagination
      const pageIndicators = ['page', 'of', 'prev', 'next', '<', '>'];
      
      pageIndicators.forEach(text => {
        const elements = Array.from(document.querySelectorAll('*'))
          .filter(el => el.textContent?.toLowerCase().includes(text.toLowerCase()));
        cy.log(`Found ${elements.length} elements with text containing "${text}"`);
        
        if (elements.length > 0 && elements.length < 5) {
          elements.forEach(el => {
            cy.log(`Element with "${text}": ${el.tagName}, Text: "${el.textContent?.trim()}", Classes: ${el.className}`);
          });
        }
      });
    });
    
    // Try to find elements with similar patterns to pagination
    cy.log('Looking for pagination-like elements');
    cy.get('div').filter((_, el) => {
      const buttons = el.querySelectorAll('button');
      if (buttons.length >= 3) {
        const btnTexts = Array.from(buttons).map(btn => btn.textContent?.trim());
        // Look for numeric sequences or navigation symbols
        return btnTexts.some(text => /^\d+$/.test(text || '')) || 
               btnTexts.some(text => ['<', '>', '«', '»', 'prev', 'next'].includes(text || ''));
      }
      return false;
    }).then($elements => {
      cy.log(`Found ${$elements.length} potential pagination elements`);
      
      if ($elements.length > 0) {
        cy.wrap($elements.eq(0)).screenshot('potential-pagination');
      }
    });
  });
}); 