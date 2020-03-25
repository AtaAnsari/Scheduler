describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("finds Tuesday and clicks on it", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected" );
  });


});
