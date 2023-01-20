export {};

describe("Todo", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("adding element", () => {
    cy.get("input").type("test");
    cy.get(`[data-cy='add']`).click();
    cy.get("ul").contains("test");
  });
  it("remove element", () => {
    cy.get("input").type("test");
    cy.get(`[data-cy='add']`).click();
    cy.contains("test")
      .parent()
      .within((e) => {
        cy.get(`[data-cy='delete']`).click();
      });
    cy.contains("test").should("not.exist");
  });
  it("mark element as done", () => {
    cy.get("input").type("test");
    cy.get(`[data-cy='add']`).click();
    cy.contains("test")
      .parent()
      .within((e) => {
        cy.get(`[data-cy='complete']`).click();
      });
    cy.contains("test")
      .then(($el) => {
        if (!$el) return;
        return window.getComputedStyle($el[0]);
      })
      .invoke("getPropertyValue", "text-decoration")
      .should("equal", "line-through solid rgb(0, 0, 0)");
  });
});
