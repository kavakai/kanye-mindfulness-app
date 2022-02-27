describe('Dashboard page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://api.kanye.rest/', { fixture: 'kanyeQuote.json' })
        cy.visit('http://localhost:3000/dashboard')
    });

    it('Should welcome a user, display the quote of the day, and have navigation buttons to navigate to the mood page', () => {
      cy.get("h1")
        .should("have.text", "Welcome, Kaja!")
        .get("[data-testid=dashboard-quote]")
        .should(
          "have.text",
          '"You may be talented, but you’re not Kanye West."'
        )
        .get("[class=burger-button]")
        .click()
        .get("[class=menu]")
        .should("be.visible")
        .get("[class=dropdown-items]")
        .contains("Vibe Check")
        .click()
        .server()
        .route("/mood")
        .get('h1')
        .contains('Vibe Check')
    });
  
  it('Should be able to navigate to journal page', () => {
    cy.get("[class=burger-button]")
      .click()
      .get("[class=dropdown-items]")
      .contains("Journal")
      .click()
      .server()
      .route("/journal")
      .get('h1')
      .contains('Journal Page')
  });

  it('Should be able to navigate to the features page', () => {
    cy.get('a')
      .first()
      .should('have.attr', 'href', '/features')
      .click()
      .server()
      .route("/features")
  });

  
})