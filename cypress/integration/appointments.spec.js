describe("Appointments", () => {
  beforeEach(function () {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/").contains("Monday");
  })

  it("should book an interview", () => {
    cy.get('img[alt="Add"]')
    .first()
    .click()
    cy.get("[data-testid=student-name-input]")
    .type("Lydia Miller-Jones")
    cy.get('img[alt="Sylvia Palmer"]')
    .click()
    cy.contains("Save")
    .click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {

    cy.get('img[alt="Edit"]').click({ force: true })
    cy.get("[data-testid=student-name-input]").clear()
    .type("Samuel L. Jackson")
    cy.get('img[alt="Tori Malcolm"]')
    .click()
    cy.contains("Save")
    .click()
    cy.contains(".appointment__card--show", "Samuel L. Jackson");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {

    cy.get('img[alt="Delete"]').click({ force: true })
    cy.contains("Confirm").click()
    cy.contains("Deleting").should('exist')
    cy.contains("Deleting").should('not.exist')
    cy.contains("Deleting").should('not.exist')
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });



});