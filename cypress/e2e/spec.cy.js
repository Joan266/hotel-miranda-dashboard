describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.url().should('include', '/login')
  });

  it('should login with correct data and redirect to home', () => {
    cy.get('[id^=email]').as('emailInput')
    cy.get('[id^=password]').as('passwordInput')
    cy.get('form').as('loginForm')

    cy.get('@emailInput').clear().type('miranda@gmail.com')
    cy.get('@passwordInput').clear().type('mirapass')
    cy.get('@loginForm').submit()

    cy.url().should('eq', 'http://localhost:5173/')
  });

  it('should not login with incorrect data and show error message', () => {
    cy.get('[id^=email]').as('emailInput')
    cy.get('[id^=password]').as('passwordInput')
    cy.get('form').as('loginForm')

    cy.get('@emailInput').clear().type('miranda@gmail.com')
    cy.get('@passwordInput').clear().type('invalidPassword')
    cy.get('@loginForm').submit()

    cy.url().should('include', '/login')

    cy.get('.error-message').should('be.visible')
      .and('contain', 'Invalid credentials')
  });
});
